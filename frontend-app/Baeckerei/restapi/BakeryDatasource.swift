//
//  BakeryDatasource.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 10.02.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import Foundation

class BakeryDatasource {
    public enum Endpoint: String {
        case login = "/user/login"
        case loaf = "/loaf"
        case bun = "/bun"
        case news = "/news"
        case picture = "/picture"
        
        func value() -> String {
            return self.rawValue
        }
    }
    
    public enum DiskFileName: String {
        case loaf = "loafs.json"
        case bun = "buns.json"
        case news = "news.json"
        
        func value() -> String {
            return self.rawValue
        }
    }
    
    private var authToken: String?
    
    private lazy var credentials: ApiCredentials = {
        return ApiCredentials(username: "benutzer", password: "pwbenutzer")
    }()

    private lazy var restApiHandler: RestApiHandler = {
        return RestApiHandler(urlScheme: "https", urlHost: "bakerybackend.grse.me")
    }()
    
    func login(successCallback: @escaping () -> ()) {
        restApiHandler.login(
            endpoint: Endpoint.login.value(),
            credentials: credentials,
            successCallback: { token in
                self.authToken = token
            
                successCallback()
            },
            errorCallback: { message in
                print(message)
            }
        )
    }
    
    func getBakedGoodsFromAPI<T: BakedGood>(endpoint: Endpoint, diskFileName: DiskFileName, successCallback: @escaping (_ loafArray: [T], _ imageDataArray: [Data])->()) {
        restApiHandler.getDecodableArrayFromAPI(
            T.self,
            token: authToken!,
            endpoint: endpoint.value(),
            method: "GET",
            successCallback: { dataArray in
                var imageDataArray = [Data]()
                for bakedgood in dataArray {
                    let imageData = self.restApiHandler.getDataFromEndpoint(endpoint: "\(Endpoint.picture.value())/\(bakedgood.pictureFilename)")
                    
                    Disk.storeData(data: imageData, to: .caches, as: bakedgood.pictureFilename)
                    
                    imageDataArray.append(imageData)
                }
                
                Disk.storeCodable(dataArray, to: .caches, as: diskFileName.value())
                
                successCallback(dataArray, imageDataArray)
            },
            errorCallback: { message in
                print(message)
            }
        )
    }
    
    func getBakedGoodsFromDisk<T: BakedGood>(diskFileName: DiskFileName, successCallback: @escaping (_ loafArray: [T], _ imageDataArray: [Data])->()) {
        let dataArray = Disk.fetchCodable(T.self, fileName: diskFileName.value(), from: .caches)!
        
        var imageDataArray = [Data]()
        for item in dataArray {
            let imageData = Disk.fetchData(fileName: item.pictureFilename, from: .caches)
            
            imageDataArray.append(imageData)
        }
        
        successCallback(dataArray, imageDataArray)
    }
    
    func existingBakedGoodsOnDisk(diskFileName: DiskFileName) -> Bool {
        return Disk.fileExists(diskFileName.value(), in: .caches)
    }
    
    func getNewsItemsFromAPI(successCallback: @escaping (_ newsArray: [NewsItem], _ imageDataArray: [Data])->()) {
        restApiHandler.getDecodableArrayFromAPI(
            NewsItem.self,
            token: authToken!,
            endpoint: Endpoint.news.value(),
            method: "GET",
            successCallback: { dataArray in
                var imageDataArray = [Data]()
                for newsitem in dataArray {
                    let imageData = self.restApiHandler.getDataFromEndpoint(endpoint: "\(Endpoint.picture.value())/\(newsitem.pictureFilename)")
                    
                    Disk.storeData(data: imageData, to: .caches, as: newsitem.pictureFilename)
                    
                    imageDataArray.append(imageData)
                }
                
                Disk.storeCodable(dataArray, to: .caches, as: DiskFileName.news.value())
                
                successCallback(dataArray, imageDataArray)
            },
            errorCallback: { message in
                print(message)
            }
        )
    }
    
    func getNewsItemsFromDisk(successCallback: @escaping (_ newsArray: [NewsItem], _ imageDataArray: [Data])->()) {
        let dataArray = Disk.fetchCodable(NewsItem.self, fileName: DiskFileName.news.value(), from: .caches)!
        
        var imageDataArray = [Data]()
        for item in dataArray {
            let imageData = Disk.fetchData(fileName: item.pictureFilename, from: .caches)
            
            imageDataArray.append(imageData)
        }
        
        successCallback(dataArray, imageDataArray)
    }
}
