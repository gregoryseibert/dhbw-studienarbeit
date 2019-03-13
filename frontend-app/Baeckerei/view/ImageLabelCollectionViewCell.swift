//
//  ImageLabelCollectionViewCell
//  Baeckerei
//
//  Created by Gregory Seibert on 16.01.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import UIKit

class ImageLabelCollectionViewCell: UICollectionViewCell {
    var imageViewPicture: UIImageView = {
        let imageViewPicture = UIImageView()
        imageViewPicture.contentMode = .scaleAspectFill
        imageViewPicture.clipsToBounds = true
        imageViewPicture.translatesAutoresizingMaskIntoConstraints = false
        return imageViewPicture
    }()
    
    var labelName: UILabel = {
        let labelName = UILabel()
        labelName.textColor = .white
        labelName.textAlignment = .center
        labelName.translatesAutoresizingMaskIntoConstraints = false
        return labelName
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        setupView()
    }
    
    func setupView() {
        clipsToBounds = true
        layer.borderWidth = 2
        layer.borderColor = UIColor(displayP3Red: 50/255, green: 50/255, blue: 50/255, alpha: 1).cgColor
        backgroundColor = UIColor(displayP3Red: 50/255, green: 50/255, blue: 50/255, alpha: 1)
        layer.cornerRadius = 4.0
        
        addSubview(imageViewPicture)
        addSubview(labelName)
        
        NSLayoutConstraint.activate([
            imageViewPicture.topAnchor.constraint(equalTo: topAnchor),
            imageViewPicture.heightAnchor.constraint(equalTo: widthAnchor),
            imageViewPicture.leftAnchor.constraint(equalTo: leftAnchor),
            imageViewPicture.rightAnchor.constraint(equalTo: rightAnchor)
        ])
        
        NSLayoutConstraint.activate([
            labelName.topAnchor.constraint(equalTo: imageViewPicture.bottomAnchor),
            labelName.bottomAnchor.constraint(equalTo: bottomAnchor),
            labelName.widthAnchor.constraint(equalTo: widthAnchor)
        ])
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
