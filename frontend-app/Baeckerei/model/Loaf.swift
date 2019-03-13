//
//  Loaf.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 10.01.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import Foundation

class Loaf: BakedGood {
    var daysOfProduction: [Weekday] = []
    
    private enum CodingKeys: String, CodingKey {
        case daysOfProduction
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        self.daysOfProduction = try container.decode([Weekday].self, forKey: .daysOfProduction)
        
        try super.init(from: decoder)
    }
    
    override func encode(to encoder: Encoder) throws {
        try super.encode(to: encoder)
        
        var container = encoder.container(keyedBy: CodingKeys.self)
        
        try container.encode(self.daysOfProduction, forKey: .daysOfProduction)
    }
    
    func getDaysOfProductionAsString() -> String {
        //if sequence of weekdays
        if (daysOfProduction.map{ Weekday.index(of: $0) - 1 }.dropFirst() == daysOfProduction.map{ Weekday.index(of: $0) }.dropLast()) {
            let head = NSLocalizedString("weekday_sequence_pre", comment: "")
            let separator = NSLocalizedString("weekday_sequence_mid", comment: "")
            return "\(head) \(daysOfProduction.first!.localizedString()) \(separator) \(daysOfProduction.last!.localizedString())"
        }
        
        return daysOfProduction.map{(dayOfProduction) -> String in
            return dayOfProduction.localizedString()
        }.joined(separator: " \(NSLocalizedString("weekday_junction", comment: "")) ")
    }
}
