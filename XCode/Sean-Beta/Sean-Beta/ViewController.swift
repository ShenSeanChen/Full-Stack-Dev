//
//  ViewController.swift
//  Sean-Beta
//
//  Created by Shen Chen on 22/06/2019.
//  Copyright © 2019 Sean. All rights reserved.
//

import UIKit

class ViewController: UIViewController { // docoration of a class
                      // UIViewController is my super class
    var flipCount = 0 {
        didSet {
            flipCountLabel.text = "Flips: \(flipCount)"
            // This avoids repeatedly writing lines of code like the above,
            // say, for multiple button senders
        }
    }
    // all instance variables / properties have to be initialized
    // var flipCount: Int = 0
    
    @IBOutlet weak var flipCountLabel: UILabel!
    
    @IBOutlet var cardButtons: [UIButton]!
    
    var emojiChoices: Array<String> = ["生", "日", "快", "乐" ]
    
    @IBAction func touchCard(_ sender: UIButton) {
        // special directory swift assigned to it
        // this is a method written in swift
        // name of the parameter UIButton
        //    print("agh! The commet is coming!")
        flipCount += 1
        if let cardNumber = cardButtons.firstIndex(of: sender) {
            flipCard(withEmoji: emojiChoices[cardNumber], on: sender)
            print("cardNumber = \(cardNumber)")
        } else {
            print("chosen card was not in cardButtons")
        }
    
    }
    
    
    //    @IBAction func touchSecondCard(_ sender: UIButton) {
//        flipCount += 1
//        flipCard(withEmoji: "✨", on: sender)
//    }
    // Tips: after copy&pasting a button, remember to disconnect its function from the previous lines of code
    
    func flipCard(withEmoji emoji: String, on button: UIButton) {
        // print("flipCard(withEmoji: \(emoji))" )
        
        if button.currentTitle == emoji {
            button.setTitle("", for: UIControl.State.normal)
            button.backgroundColor =  #colorLiteral(red: 1, green: 0.5763723254, blue: 0, alpha: 1)
        } else {
            button.setTitle(emoji, for: UIControl.State.normal)
            button.backgroundColor = #colorLiteral(red: 1, green: 1, blue: 1, alpha: 1)
        }
    }
    
}

