//
//  RestApiHandler.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 03.02.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import Foundation

class RestApiHandler {
    private let apiBaseURL: URL
    
    init(urlScheme: String, urlHost: String) {
        var urlComponents = URLComponents()
        urlComponents.scheme = urlScheme
        urlComponents.host = urlHost
        apiBaseURL = urlComponents.url!
    }
    
    private func createRequest(endpoint: String, method: String) -> URLRequest {
        let url = apiBaseURL.appendingPathComponent(endpoint)
        
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Accept")
        
        return request
    }
    
    private func createAuthenticatedRequest(endpoint: String, method: String, token: String) -> URLRequest {
        var request = createRequest(endpoint: endpoint, method: method)
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        return request
    }
    
    func login(endpoint: String, credentials: ApiCredentials, successCallback: @escaping (_ result: String)->(), errorCallback: @escaping (_ result: String)->()) {
        var request = createRequest(endpoint: endpoint, method: "POST")
        
        do {
            let jsonEncoder = JSONEncoder()
            let jsonData = try jsonEncoder.encode(credentials)
            
            request.httpBody = jsonData
            
            let session = URLSession(configuration: URLSessionConfiguration.default)
            
            let task = session.dataTask(with: request, completionHandler: {responseData, response, error -> Void in
                if let jsonData = responseData {
                    do {
                        let json = try JSONSerialization.jsonObject(with: jsonData, options: .allowFragments) as! [String:Any]
                        let token = json["token"] as! String
                        
                        DispatchQueue.main.async {
                            successCallback(token)
                        }
                    } catch let error as NSError {
                        errorCallback(error.localizedDescription)
                    }
                } else {
                    let error = NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey : "Data was not retrieved from request"]) as Error
                    errorCallback(error.localizedDescription)
                }
            })
            
            task.resume()
        } catch {
            errorCallback(error.localizedDescription)
        }
    }
    
    func getDecodableArrayFromAPI<DataType: Decodable>(_ dump: DataType.Type, token: String, endpoint: String, method: String, successCallback: @escaping (_ result: [DataType])->(), errorCallback: @escaping (_ result: String)->()) {
        let request = createAuthenticatedRequest(endpoint: endpoint, method: method, token: token)
        
        let session = URLSession(configuration: URLSessionConfiguration.default)
        
        let task = session.dataTask(with: request) { (responseData, response, responseError) in
            DispatchQueue.main.async {
                if let error = responseError {
                    errorCallback("\(error.localizedDescription) (Code: 1)")
                } else if let jsonData = responseData {
                    //print(String(data: jsonData, encoding: .utf8)!)
                    
                    let decoder = JSONDecoder()
                    
                    do {
                        let data = try decoder.decode([DataType].self, from: jsonData)
                        DispatchQueue.main.async {
                            successCallback(data)
                        }
                    } catch {
                        do {
                            let apiError = try decoder.decode(ApiError.self, from: jsonData)
                            errorCallback("\(apiError.message) (\(apiError.errorCode))")
                        } catch {
                            //errorCallback("\(error.localizedDescription) (Code: 2)")
                            print(error.localizedDescription)
                        }
                    }
                } else {
                    let error = NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey : "Data was not retrieved from request"]) as Error
                    errorCallback(error.localizedDescription)
                }
            }
        }
        
        task.resume()
    }
    
    func getDataFromEndpoint(endpoint: String) -> Data {
        do {
            let url = apiBaseURL.appendingPathComponent(endpoint)
            let data = try Data(contentsOf: url)
            return data
        } catch{
            print(error)
        }
        
        return Data()
    }
}
