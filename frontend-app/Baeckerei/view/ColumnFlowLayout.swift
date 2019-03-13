//
//  ColumnFlowLayout.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 17.01.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import UIKit

class ColumnFlowLayout: UICollectionViewFlowLayout {
    private var estimatedCellWidth: CGFloat!
    private var cellMarginSize: CGFloat!
    private var heightOffset: CGFloat!
    
    init(estimatedCellWidth: CGFloat, cellMarginSize: CGFloat, heightOffset: CGFloat) {
        super.init()
        
        self.estimatedCellWidth = estimatedCellWidth
        self.cellMarginSize = cellMarginSize
        self.heightOffset = heightOffset
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func prepare() {
        super.prepare()
        
        let cellWidth = calculateWidth()
        
        itemSize = CGSize(width: cellWidth, height: cellWidth + heightOffset)
        minimumLineSpacing = cellMarginSize
        minimumInteritemSpacing = cellMarginSize
        
        sectionInset = UIEdgeInsets(top: minimumLineSpacing, left: minimumInteritemSpacing, bottom: 0, right: minimumInteritemSpacing)
        
        sectionInsetReference = .fromSafeArea
    }
    
    func calculateWidth() -> CGFloat {
        let cellCount = floor(CGFloat(collectionView!.frame.size.width / estimatedCellWidth))
        let margin: CGFloat = cellMarginSize * 2
        let width: CGFloat = (collectionView!.frame.size.width - cellMarginSize * (cellCount - 1) - margin) / cellCount
        return width
    }
}
