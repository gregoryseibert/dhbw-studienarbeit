//
//  LoafDetailViewController.swift
//  Baeckerei
//
//  Created by Gregory Seibert on 17.01.19.
//  Copyright © 2019 Gregory Seibert. All rights reserved.
//

import UIKit

class LoafDetailViewController: UIViewController {
    private let contentWidth: CGFloat = 350
    private let contentOffset: CGFloat = 15
    private let attributesBoldFont = [NSAttributedString.Key.font : UIFont.boldSystemFont(ofSize: UIFont.systemFontSize)]
    private var loaf: Loaf?
    
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

    private lazy var imageView: UIImageView = {
        let imageView = UIImageView()
        imageView.layer.borderColor = UIColor(displayP3Red: 50/255, green: 50/255, blue: 50/255, alpha: 1).cgColor
        imageView.layer.borderWidth = 2
        imageView.contentMode = .scaleAspectFill
        imageView.clipsToBounds = true
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    private lazy var textContainer: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    private lazy var textWeight: UITextView = createTextViewWithHeader(header: NSLocalizedString("bakedgood_weight", comment: ""), content: loaf!.getWeightAsString())
    
    private lazy var textNutrients: UITextView = createTextViewWithHeader(header: NSLocalizedString("bakedgood_nutrients", comment: ""), content: loaf!.getNutrientsAsString())
    
    private lazy var textCharakteristic = createTextViewWithHeader(header: NSLocalizedString("bakedgood_characteristic", comment: ""), content: loaf!.characteristic)
    
    private lazy var textCerealMix: UITextView = createTextViewWithHeader(header: NSLocalizedString("bakedgood_cerealmix", comment: ""), content: loaf!.getCerealMixAsString())
    
    private lazy var textIngredients: UITextView = createTextViewWithHeader(header: NSLocalizedString("bakedgood_ingredients", comment: ""), content: loaf!.getIngredientsAsString())
    
    private lazy var textDaysOfProduction: UITextView = createTextViewWithHeader(header: NSLocalizedString("bakedgood_daysofproduction", comment: ""), content: loaf!.getDaysOfProductionAsString())
    
    override func viewDidLoad() {
        super.viewDidLoad()

        title = loaf!.name
        
        view.backgroundColor = .white
        
        setupView()
        
        setupConstraints()
    }
    
    func setData(item: Loaf, image: UIImage) {
        self.loaf = item
        imageView.image = image
    }
    
    private func setupView() {
        view.addSubview(scrollView)
        
        scrollView.addSubview(contentView)
        
        contentView.addSubview(imageView)
        
        contentView.addSubview(textContainer)
        
        textContainer.addSubview(textCerealMix)
        textContainer.addSubview(textIngredients)
        textContainer.addSubview(textWeight)
        textContainer.addSubview(textDaysOfProduction)
        textContainer.addSubview(textNutrients)
        textContainer.addSubview(textCharakteristic)
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
                textContainer.topAnchor.constraint(equalTo: imageView.bottomAnchor),
                textContainer.rightAnchor.constraint(equalTo: contentView.rightAnchor),
                textContainer.leftAnchor.constraint(equalTo: contentView.leftAnchor),
                textContainer.bottomAnchor.constraint(equalTo: contentView.bottomAnchor),
            ])
            
            NSLayoutConstraint.activate([
                textCerealMix.topAnchor.constraint(equalTo: textContainer.topAnchor, constant: contentOffset),
                textCerealMix.centerXAnchor.constraint(equalTo: textContainer.centerXAnchor),
                textCerealMix.widthAnchor.constraint(equalToConstant: contentWidth)
            ])
            
            constrainCenteredViewBelowTo(targetView: textIngredients, upperView: textCerealMix)
            constrainCenteredViewBelowTo(targetView: textWeight, upperView: textIngredients)
            constrainCenteredViewBelowTo(targetView: textDaysOfProduction, upperView: textWeight)
            constrainCenteredViewBelowTo(targetView: textNutrients, upperView: textDaysOfProduction)
            constrainCenteredViewBelowTo(targetView: textCharakteristic, upperView: textNutrients)
            
            NSLayoutConstraint.activate([
                textCharakteristic.bottomAnchor.constraint(equalTo: textContainer.bottomAnchor),
            ])
        } else {
            NSLayoutConstraint.activate([
                imageView.topAnchor.constraint(equalTo: contentView.topAnchor, constant: contentOffset),
                imageView.leftAnchor.constraint(equalTo: contentView.leftAnchor, constant: contentOffset),
                imageView.heightAnchor.constraint(equalToConstant: view.frame.width * 0.5),
                imageView.widthAnchor.constraint(equalToConstant: view.frame.width * 0.5)
            ])

            NSLayoutConstraint.activate([
                textContainer.topAnchor.constraint(equalTo: contentView.topAnchor, constant: contentOffset),
                textContainer.leftAnchor.constraint(equalTo: imageView.rightAnchor, constant: contentOffset),
                textContainer.widthAnchor.constraint(equalToConstant: view.frame.width * 0.5)
            ])

            NSLayoutConstraint.activate([
                textCerealMix.topAnchor.constraint(equalTo: textContainer.topAnchor),
                textCerealMix.widthAnchor.constraint(equalToConstant: contentWidth)
            ])

            constrainViewBelowTo(targetView: textIngredients, upperView: textCerealMix)
            constrainViewBelowTo(targetView: textWeight, upperView: textIngredients)
            constrainViewBelowTo(targetView: textDaysOfProduction, upperView: textWeight)
            constrainViewBelowTo(targetView: textNutrients, upperView: textDaysOfProduction)
            constrainViewBelowTo(targetView: textCharakteristic, upperView: textNutrients)
        }
    }
    
    private func createTextViewWithHeader(header: String, content: String) -> UITextView {
        let contentString = NSMutableAttributedString(string: header + ": \n", attributes: attributesBoldFont)
        contentString.append(NSAttributedString(string: content))
        
        let textView = UITextView()
        textView.attributedText = contentString
        textView.isEditable = false
        textView.isSelectable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }
    
    private func constrainCenteredViewBelowTo(targetView: UIView, upperView: UIView) {
        NSLayoutConstraint.activate([
            targetView.topAnchor.constraint(equalTo: upperView.bottomAnchor, constant: contentOffset),
            targetView.centerXAnchor.constraint(equalTo: targetView.superview!.centerXAnchor),
            targetView.widthAnchor.constraint(equalToConstant: contentWidth)
        ])
    }
    
    private func constrainViewBelowTo(targetView: UIView, upperView: UIView) {
        NSLayoutConstraint.activate([
            targetView.topAnchor.constraint(equalTo: upperView.bottomAnchor, constant: contentOffset),
            targetView.widthAnchor.constraint(equalToConstant: contentWidth)
        ])
    }
}
