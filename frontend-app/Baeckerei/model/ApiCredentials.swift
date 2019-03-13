//
//  ApiCredentials.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 03.02.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import Foundation

class ApiCredentials: Codable {
    var username: String
    var password: String
    
    init(username: String, password: String) {
        self.username = username
        self.password = password
    }
}
