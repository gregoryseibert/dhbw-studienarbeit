//
//  Weekday.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 10.01.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import Foundation

enum Weekday: String, Codable {
    case MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
    
    func localizedString() -> String {
        return NSLocalizedString(self.rawValue.lowercased(), comment: "")
    }
    
    static func index(of weekday: Weekday) -> Int {
        let elements = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY]
        
        return elements.firstIndex(of: weekday)!
    }
}
