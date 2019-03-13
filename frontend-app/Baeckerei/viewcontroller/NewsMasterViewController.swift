//
//  NewsMasterViewController.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 13.01.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import UIKit

import UIKit

class NewsMasterViewController: UIViewController {
    private var newsArray = [NewsItem]()
    private var imageDataArray = [Data]()
    
    private let defaultCellImage = UIImage(named: "newsitem_default")
    
    private let cellReuseIdentifier = "NewsItemCell"
    private let estimatedCellWidth: CGFloat = 150
    private let cellMarginSize: CGFloat = 15
    private let cellHeightOffset: CGFloat = 30
    
    private var logoImageView: UIImageView = {
        let imageView = UIImageView(image: UIImage(named: "logo_header"))
        imageView.contentMode = .scaleAspectFit
        return imageView
    }()
    
    private lazy var layout: UICollectionViewFlowLayout = {
        let layout: UICollectionViewFlowLayout = ColumnFlowLayout(
            estimatedCellWidth: estimatedCellWidth,
            cellMarginSize: cellMarginSize,
            heightOffset: cellHeightOffset
        )
        return layout
    }()
    
    private lazy var collectionView: UICollectionView = {
        let collectionView = UICollectionView(frame: view.bounds, collectionViewLayout: layout)
        collectionView.register(ImageLabelCollectionViewCell.self, forCellWithReuseIdentifier: cellReuseIdentifier)
        collectionView.dataSource = self
        collectionView.delegate = self
        collectionView.backgroundColor = .white
        collectionView.alwaysBounceVertical = true
        collectionView.frame = view.bounds
        collectionView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        return collectionView
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.addSubview(collectionView)
        
        navigationItem.titleView = logoImageView
    }
    
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        super.viewWillTransition(to: size, with: coordinator)
        
        collectionView.collectionViewLayout.invalidateLayout()
        collectionView.reloadData()
    }
    
    func setData(dataArray: [NewsItem], imageDataArray: [Data]) {
        self.newsArray = dataArray
        self.imageDataArray = imageDataArray
        
        collectionView.reloadData()
    }
}

extension NewsMasterViewController: UICollectionViewDataSource {
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return newsArray.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: cellReuseIdentifier, for: indexPath) as! ImageLabelCollectionViewCell
        
        let currentItem = newsArray[indexPath.row]
        
        cell.labelName.text = currentItem.title
        
        if indexPath.row < imageDataArray.count {
            let imageData = imageDataArray[indexPath.row]
            
            //if imagedata contains data
            cell.imageViewPicture.image = imageData.count > 0 ? UIImage(data: imageData) : defaultCellImage
        } else {
            cell.imageViewPicture.image = defaultCellImage
        }
        
        return cell
    }
}

extension NewsMasterViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let detailViewController = NewsDetailViewController()
        let item = newsArray[indexPath.row]
        let cell = collectionView.cellForItem(at: indexPath) as! ImageLabelCollectionViewCell
        let image = cell.imageViewPicture.image
        
        detailViewController.setData(item: item, image: image ?? defaultCellImage!)
        
        navigationController?.pushViewController(detailViewController, animated: true)
    }
}
