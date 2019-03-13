//
//  Ingredient.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 10.01.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import UIKit

class Ingredient: Codable {
    let id: Int
    var name: String
    var allergyTypes: [AllergyType] = []
    
    func toString() -> String {
        if allergyTypes.count > 0 {
            return name.uppercased()
        }
        
        return name
    }
}
