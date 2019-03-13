//
//  NewsDetailViewController.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 10.02.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import UIKit

class NewsDetailViewController: UIViewController {
    private let contentWidth: CGFloat = 350
    private let contentOffset: CGFloat = 15
    private var newsItem: NewsItem?
    
    private lazy var scrollView: UIScrollView = {
        let scrollView = UIScrollView()
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        return scrollView
    }()
    
    private lazy var contentView: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    private var imageView: UIImageView = {
        let imageView = UIImageView()
        imageView.backgroundColor = UIColor(displayP3Red: 50/255, green: 50/255, blue: 50/255, alpha: 1)
        imageView.layer.borderColor = UIColor(displayP3Red: 50/255, green: 50/255, blue: 50/255, alpha: 1).cgColor
        imageView.layer.borderWidth = 2
        imageView.contentMode = .scaleAspectFit
        imageView.clipsToBounds = true
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    private var contentTextView: UITextView = {
        let textView = UITextView()
        textView.isEditable = false
        textView.isSelectable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        title = newsItem!.title
        
        view.backgroundColor = .white
        
        setupView()
        
        setupConstraints()
    }
    
    func setData(item: NewsItem, image: UIImage) {
        self.newsItem = item
        imageView.image = image
        contentTextView.text = item.content
    }
    
    private func setupView() {
        view.addSubview(scrollView)
        
        scrollView.addSubview(contentView)
        
        contentView.addSubview(imageView)
        
        contentView.addSubview(contentTextView)
    }
    
    private func setupConstraints() {
        NSLayoutConstraint.activate([
            scrollView.topAnchor.constraint(equalTo: view.topAnchor),
            scrollView.rightAnchor.constraint(equalTo: view.rightAnchor),
            scrollView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            scrollView.leftAnchor.constraint(equalTo: view.leftAnchor)
        ])
        
        NSLayoutConstraint.activate([
            contentView.topAnchor.constraint(equalTo: scrollView.topAnchor),
            contentView.rightAnchor.constraint(equalTo: scrollView.rightAnchor),
            contentView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor),
            contentView.leftAnchor.constraint(equalTo: scrollView.leftAnchor),
            contentView.widthAnchor.constraint(equalTo: scrollView.widthAnchor)
        ])
        
        if traitCollection.horizontalSizeClass == .compact {
            NSLayoutConstraint.activate([
                imageView.topAnchor.constraint(equalTo: contentView.topAnchor, constant: contentOffset),
                imageView.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
                imageView.heightAnchor.constraint(equalToConstant: contentWidth),
                imageView.widthAnchor.constraint(equalToConstant: contentWidth)
            ])
            
            NSLayoutConstraint.activate([
                contentTextView.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: contentOffset),
                contentTextView.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
                contentTextView.widthAnchor.constraint(equalToConstant: contentWidth),
                contentTextView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor)
            ])
        } else {
            NSLayoutConstraint.activate([
                imageView.topAnchor.constraint(equalTo: contentView.topAnchor, constant: contentOffset),
                imageView.leftAnchor.constraint(equalTo: contentView.leftAnchor, constant: contentOffset),
                imageView.heightAnchor.constraint(equalToConstant: view.frame.width * 0.5),
                imageView.widthAnchor.constraint(equalToConstant: view.frame.width * 0.5)
            ])
            
            NSLayoutConstraint.activate([
                contentTextView.topAnchor.constraint(equalTo: contentView.topAnchor, constant: contentOffset),
                contentTextView.leftAnchor.constraint(equalTo: imageView.rightAnchor, constant: contentOffset),
                contentTextView.widthAnchor.constraint(equalToConstant: view.frame.width * 0.5)
            ])
        }
    }
}
