//
//  BunMasterViewController.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 13.01.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import UIKit

class BunMasterViewController: UIViewController {
    private var bunArray = [Bun]()
    private var filteredBunArray = [Bun]()
    private var imageDataArray = [Data]()
    
    private var searchController: UISearchController?
    
    private let cellReuseIdentifier = "BunCell"
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
        collectionView.alwaysBounceVertical = true
        return collectionView
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.addSubview(collectionView)
        
        navigationItem.titleView = logoImageView
        
        setupSearchbar()
    }
    
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        super.viewWillTransition(to: size, with: coordinator)
        
        collectionView.collectionViewLayout.invalidateLayout()
        collectionView.reloadData()
    }
    
    private func setupSearchbar() {
        searchController = UISearchController(searchResultsController: nil)
        searchController!.searchResultsUpdater = self
        searchController!.obscuresBackgroundDuringPresentation = false
        searchController!.searchBar.placeholder = NSLocalizedString("searchbar_buns", comment: "")
        
        searchController!.searchBar.scopeButtonTitles = [
            NSLocalizedString("noallergens", comment: ""),
            NSLocalizedString("egg", comment: ""),
            NSLocalizedString("nut", comment: ""),
            NSLocalizedString("milk", comment: ""),
            NSLocalizedString("gluten", comment: "")
        ]
        searchController!.searchBar.delegate = self
        
        navigationItem.searchController = searchController
        navigationItem.hidesSearchBarWhenScrolling = false
        definesPresentationContext = true
    }
    
    func setData(dataArray: [Bun], imageDataArray: [Data]) {
        self.bunArray = dataArray
        self.imageDataArray = imageDataArray
        
        collectionView.reloadData()
    }
    
    func searchBarIsEmpty() -> Bool {
        return searchController!.searchBar.text?.isEmpty ?? true
    }
    
    func isFiltering() -> Bool {
        let searchBarScopeIsFiltering = searchController!.searchBar.selectedScopeButtonIndex != 0
        
        return searchController!.isActive && (!searchBarIsEmpty() || searchBarScopeIsFiltering)
    }
    
    func filterContentForSearchText(_ searchText: String, scope: String = NSLocalizedString("noallergens", comment: "")) {
        filteredBunArray = bunArray.filter({( bun: Bun) -> Bool in
            let doesCategoryMatch = (scope == NSLocalizedString("noallergens", comment: "")) || (!bun.hasAllergyType(allergyType: AllergyType.fromString(string: scope)!))
            
            if searchBarIsEmpty() {
                return doesCategoryMatch
            } else {
                return doesCategoryMatch && bun.name.lowercased().contains(searchText.lowercased())
            }
        })
        
        collectionView.reloadData()
    }
}

extension BunMasterViewController: UICollectionViewDataSource {
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return isFiltering() ? filteredBunArray.count : bunArray.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: cellReuseIdentifier, for: indexPath) as! ImageLabelCollectionViewCell
        
        let currentItem = isFiltering() ? filteredBunArray[indexPath.row] : bunArray[indexPath.row]
        
        if indexPath.row < imageDataArray.count {
            let imageData = imageDataArray[indexPath.row]
            
            cell.imageViewPicture.image = imageData.count > 0 ? UIImage(data: imageData) : UIImage(named: "bun_default")
        } else {
            cell.imageViewPicture.image = UIImage(named: "bun_default")
        }
        
        cell.labelName.text = currentItem.name
        
        return cell
    }
}

extension BunMasterViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let detailViewController = BunDetailViewController()
        let item = isFiltering() ? filteredBunArray[indexPath.row] : bunArray[indexPath.row]
        let image = (collectionView.cellForItem(at: indexPath) as! ImageLabelCollectionViewCell).imageViewPicture.image
        
        detailViewController.setData(item: item, image: image ?? UIImage(named: "bun_default")!)
        
        navigationController?.pushViewController(detailViewController, animated: true)
    }
}

extension BunMasterViewController: UISearchResultsUpdating {
    func updateSearchResults(for searchController: UISearchController) {
        let searchBar = searchController.searchBar
        let scope = searchBar.scopeButtonTitles![searchBar.selectedScopeButtonIndex]
        
        filterContentForSearchText(searchController.searchBar.text!, scope: scope)
    }
}

extension BunMasterViewController: UISearchBarDelegate {
    func searchBar(_ searchBar: UISearchBar, selectedScopeButtonIndexDidChange selectedScope: Int) {
        filterContentForSearchText(searchBar.text!, scope: searchBar.scopeButtonTitles![selectedScope])
    }
}
