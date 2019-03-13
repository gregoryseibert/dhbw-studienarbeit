//
//  NewsItem.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 10.02.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import Foundation

class NewsItem: Codable {
    let id: Int
    var title: String
    var content: String
    var pictureFilename: String
}
