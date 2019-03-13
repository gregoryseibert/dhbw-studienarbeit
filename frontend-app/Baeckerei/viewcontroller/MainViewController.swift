//
//  MainViewController.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 01.02.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import UIKit

class MainViewController: UITabBarController {
    private let bakeryDatasource = BakeryDatasource()
    
    private var loafMasterViewController = LoafMasterViewController()
    private var bunMasterViewController = BunMasterViewController()
    private var newsMasterViewController = NewsMasterViewController()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.backgroundColor = .white
        
        setupTabBarItems()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        if bakeryDatasource.existingBakedGoodsOnDisk(diskFileName: .bun) && bakeryDatasource.existingBakedGoodsOnDisk(diskFileName: .loaf) && bakeryDatasource.existingBakedGoodsOnDisk(diskFileName: .news) {
            askForDataSource()
        } else {
            setDataFromApi()
        }
    }
    
    func setupTabBarItems() {
        let navigationControllerLoafs = UINavigationController(rootViewController: loafMasterViewController)
        navigationControllerLoafs.tabBarItem.image = UIImage(named: "loafs")
        navigationControllerLoafs.title = NSLocalizedString("loafs", comment: "")
        
        let navigationControllerBuns = UINavigationController(rootViewController: bunMasterViewController)
        navigationControllerBuns.tabBarItem.image = UIImage(named: "buns")
        navigationControllerBuns.title = NSLocalizedString("buns", comment: "")
        
        let navigationControllerNews = UINavigationController(rootViewController: newsMasterViewController)
        navigationControllerNews.tabBarItem.image = UIImage(named: "news")
        navigationControllerNews.title = NSLocalizedString("news", comment: "")
        
        viewControllers = [navigationControllerLoafs, navigationControllerBuns, navigationControllerNews]
    }
    
    private func askForDataSource() {
        let title = NSLocalizedString("datasource_choice_title", comment: "")
        let message = NSLocalizedString("datasource_choice_message", comment: "")
        let alertController = UIAlertController(title: title, message: message, preferredStyle: .alert)
        
        let optionDiskTitle = NSLocalizedString("datasource_choice_option_disk", comment: "")
        let optionDisk = UIAlertAction(title: optionDiskTitle, style: .default) { UIAlertAction in
            self.setDataFromDisk()
        }
        
        let optionApiTitle = NSLocalizedString("datasource_choice_option_api", comment: "")
        let optionApi = UIAlertAction(title: optionApiTitle, style: .default) { UIAlertAction in
            self.setDataFromApi()
        }
        
        alertController.addAction(optionDisk)
        alertController.addAction(optionApi)
        
        present(alertController, animated: true, completion: nil)
    }
    
    private func setDataFromDisk() {
        bakeryDatasource.getBakedGoodsFromDisk(diskFileName: .loaf, successCallback: loafMasterViewController.setData)
        bakeryDatasource.getBakedGoodsFromDisk(diskFileName: .bun, successCallback: bunMasterViewController.setData)
        bakeryDatasource.getNewsItemsFromDisk(successCallback: newsMasterViewController.setData)
    }
    
    private func setDataFromApi() {
        bakeryDatasource.login {
            self.bakeryDatasource.getBakedGoodsFromAPI(endpoint: .loaf, diskFileName: .loaf, successCallback: self.loafMasterViewController.setData)
            self.bakeryDatasource.getBakedGoodsFromAPI(endpoint: .bun, diskFileName: .bun, successCallback: self.bunMasterViewController.setData)
            self.bakeryDatasource.getNewsItemsFromAPI(successCallback: self.newsMasterViewController.setData)
        }
    }
}
