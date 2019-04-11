//
//  AllergyType.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 20.02.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import Foundation

enum AllergyType: String, Codable {
    case EGG, NUT, MILK, GLUTEN
    
    func localizedString() -> String {
        return NSLocalizedString(self.rawValue.lowercased(), comment: "")
    }
    
    static func index(of allergenType: AllergyType) -> Int {
        let elements = [EGG, NUT, MILK, GLUTEN]
        
        return elements.firstIndex(of: allergenType)!
    }
    
    static func fromString(string: String) -> AllergyType? {
        let elements = [EGG, NUT, MILK, GLUTEN]
        
        for element in elements {
            if element.localizedString().lowercased() == string.lowercased() {
                return element
            }
        }
        
        return nil
    }
    
    static func getAll() -> [AllergyType] {
        return [EGG, NUT, MILK, GLUTEN]
    }
}
