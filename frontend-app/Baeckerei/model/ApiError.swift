//
//  Exception.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 03.02.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import Foundation

class ApiError: Codable {
    var date: String
    var errorCode: Int
    var errorName: String
    var message: String
    var details: String
}
