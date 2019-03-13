//
//  DiskHandler.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 08.02.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import Foundation

public class Disk {
    
    fileprivate init() { }
    
    enum Directory {
        /// Only documents and other data that is user-generated, or that cannot otherwise be recreated by your application, should be stored in the <Application_Home>/Documents directory and will be automatically backed up by iCloud.
        case documents
        
        /// Data that can be downloaded again or regenerated should be stored in the <Application_Home>/Library/Caches directory. Examples of files you should put in the Caches directory include database cache files and downloadable content, such as that used by magazine, newspaper, and map applications.
        case caches
    }
    
    static fileprivate func getURL(for directory: Directory) -> URL {
        var searchPathDirectory: FileManager.SearchPathDirectory
        
        switch directory {
            case .documents:
                searchPathDirectory = .documentDirectory
            case .caches:
                searchPathDirectory = .cachesDirectory
        }
        
        if let url = FileManager.default.urls(for: searchPathDirectory, in: .userDomainMask).first {
            return url
        } else {
            fatalError("Could not create URL for specified directory!")
        }
    }
    
    static func storeData(data: Data, to directory: Directory, as fileName: String) {
        let url = getURL(for: directory).appendingPathComponent(fileName, isDirectory: false)
        
        do {
            //print(String(data: data, encoding: .utf8)!)
            
            if FileManager.default.fileExists(atPath: url.path) {
                try FileManager.default.removeItem(at: url)
            }
            
            FileManager.default.createFile(atPath: url.path, contents: data, attributes: nil)
        } catch {
            fatalError(error.localizedDescription)
        }
    }
    
    static func storeCodable<T: Codable>(_ objects: [T], to directory: Directory, as fileName: String) {
        do {
            let data = try JSONEncoder().encode(objects)
            
            storeData(data: data, to: directory, as: fileName)
        } catch {
            fatalError(error.localizedDescription)
        }
    }
    
    static func fetchData(fileName: String, from directory: Directory) -> Data {
        let url = getURL(for: directory).appendingPathComponent(fileName, isDirectory: false)
        
        if !FileManager.default.fileExists(atPath: url.path) {
            fatalError("File at path \(url.path) does not exist!")
        }
        
        if let data = FileManager.default.contents(atPath: url.path) {
            //print(String(data: data, encoding: .utf8)!)
            
            return data
        } else {
            fatalError("No data found  at\(url.path)!")
        }
    }
    
    static func fetchCodable<DataType: Codable>(_ dump: DataType.Type, fileName: String, from directory: Directory) -> [DataType]? {
        let data = fetchData(fileName: fileName, from: directory)
        
        do {
            let dataArray = try JSONDecoder().decode([DataType].self, from: data)
            
            return dataArray
        } catch {
            print(error)
            fatalError(error.localizedDescription)
        }
    }
    
    static func clear(_ directory: Directory) {
        let url = getURL(for: directory)
        do {
            let contents = try FileManager.default.contentsOfDirectory(at: url, includingPropertiesForKeys: nil, options: [])
            for fileUrl in contents {
                try FileManager.default.removeItem(at: fileUrl)
            }
        } catch {
            fatalError(error.localizedDescription)
        }
    }
    
    static func remove(_ fileName: String, from directory: Directory) {
        let url = getURL(for: directory).appendingPathComponent(fileName, isDirectory: false)
        if FileManager.default.fileExists(atPath: url.path) {
            do {
                try FileManager.default.removeItem(at: url)
            } catch {
                fatalError(error.localizedDescription)
            }
        }
    }
    
    static func fileExists(_ fileName: String, in directory: Directory) -> Bool {
        let url = getURL(for: directory).appendingPathComponent(fileName, isDirectory: false)
        return FileManager.default.fileExists(atPath: url.path)
    }
}
