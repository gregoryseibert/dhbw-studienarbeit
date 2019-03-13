//
//  CerealMixPercentage.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 10.01.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import Foundation

class CerealMixPercentage: Codable {
    let id: Int
    var ingredient: Ingredient
    var percentage: Int
    
    init(id: Int, ingredient: Ingredient, percentage: Int) {
        self.id = id
        self.ingredient = ingredient
        self.percentage = percentage
    }
    
    func toString() -> String {
        return "\(percentage)% \(ingredient.toString())"
    }
}
