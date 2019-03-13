//
//  BakedGood.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 02.02.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import Foundation

class BakedGood: Codable {
    let id: Int
    var name, characteristic: String
    var weight, kcal, fat, carbohydrates, protein: Double
    var pictureFilename: String
    
    var cerealMix: [CerealMixPercentage]
    var ingredients: [Ingredient]
    
    func hasAllergyType(allergyType: AllergyType) -> Bool {
        for ingredient in ingredients {
            if ingredient.allergyTypes.contains(allergyType) {
                return true
            }
        }
        
        for cerealMix in cerealMix {
            if cerealMix.ingredient.allergyTypes.contains(allergyType) {
                return true
            }
        }
        
        return false
    }
    
    func getWeightAsString() -> String {
        return "\(weight)g"
    }
    
    func getNutrientsAsString() -> String {
        return """
        \(kcal)\(NSLocalizedString("bakedgood_nutrients_kcal", comment: ""))
        \(protein)g \(NSLocalizedString("bakedgood_nutrients_protein", comment: ""))
        \(carbohydrates)g \(NSLocalizedString("bakedgood_nutrients_carbohydrates", comment: ""))
        \(fat)g \(NSLocalizedString("bakedgood_nutrients_fat", comment: ""))
        """
    }
    
    func getCerealMixAsString() -> String {
        return cerealMix.map{(cerealMix) -> String in
            return cerealMix.toString()
        }.joined(separator: ", ")
    }
    
    func getIngredientsAsString() -> String {
        return ingredients.map{(ingredient) -> String in
            return ingredient.toString()
        }.joined(separator: ", ")
    }
}
