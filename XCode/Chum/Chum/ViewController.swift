//
//  ViewController.swift
//  Chum
//
//  Created by Shen Chen on 31/12/2019.
//  Copyright © 2019 MIT. All rights reserved.
//

import UIKit //IOS's framework that has buttons, sliders and stuff

// decoration of a class
class ViewController: UIViewController
{
    // ViewController is the name of the class, which also shows up in my UI
    // UIViewController is the superclass: it knows everything about controlling UIs
 
    // add instance variable, or also called properties
    // var flipCount: Int = 0 // a variable called flipCount
    var flipCount = 0 {// Swift can guess the type
        didSet { // property observer
            flipCountLabel.text = "Flips: \(flipCount)" //update the instance variable
        }
    }
    // outlet: creates an instance variable
    // action: creates a method
    @IBOutlet weak var flipCountLabel: UILabel! // the exclamation is super important
    
    // swift arrays

    
    
    @IBOutlet var cardButons: [UIButton]!
    
    // var emojiChoices: Array<String> = ["🤪", "🧐", "🤓", "😎"]
    var emojiChoices = ["🤓", "🤪", "😎", "🧐", "🤓", "😎", "🤪", "🧐"]
    
    var cardPrevNum = 0
    
    // a swift method in the class
    @IBAction func touchCard(_ sender: UIButton) {
    // IBAction is not he method; it is a special directive for the round circle on the left
    // func is the function, which is followed by the name of the function
    // name of the argument parameter: _ sender
    // UIButton is the type of the argument, which is a UI button
    // we can do: @IBAction func touchCard(_ sender: UIButton) -> Int {} if we wanna return an integer
//        print("Yo! Wus'up?")

        
        // Let us use the method/function we defined below: flipCard
        //flipCard(withEmoji: "❡", on: sender)
//        print("prevIndex = \(prevIndex)")
        
        let cardNumber = cardButons.firstIndex(of: sender)!
//        if prevIndex != 1000 {
//        flipCard(withEmoji: emojiChoices[prevIndex], on: sender)
//        }
        print("cardNumber: \(cardNumber)")
        flipCard(withEmoji: emojiChoices[cardNumber], on: sender)
        if flipCount > 0 {
            flipCard(withEmoji: emojiChoices[cardPrevNum], on: cardButons[cardPrevNum])
            if emojiChoices[cardNumber] == emojiChoices[cardPrevNum] {
                cardButons[cardNumber].isHidden = true
                cardButons[cardPrevNum].isHidden = true
            }
        }
        

        // !: helps define an optional type
        
        flipCount += 1 // count the flip count
        //flipCountLabel.text = "Flips: \(flipCount)" //update the instance variable
        
        print("cardNumber = \(cardNumber)")
        
        cardPrevNum = cardNumber
//        print("prevIndex = \(prevIndex)")
        
    }
    
    
    @IBAction func restart(_ sender: UIButton) {
        flipCount = 0
        for card in cardButons {
            card.isHidden = false
            flipCard(withEmoji: "restart", on: card)
        }
        emojiChoices.shuffle()
    }
    
    
    
//    @IBAction func reset(_ sender: UIButton) {
//        reset(on: cardButons)
//    }
//
//    func reset(on button: UIButton) {
//        button.setTitle("", for: UIControl.State.normal)
//        button.backgroundColor = #colorLiteral(red: 0.2392156869, green: 0.6745098233, blue: 0.9686274529, alpha: 1)
//    }
    
    
//    @IBAction func touchSecondCard(_ sender: UIButton) {
//        print("Yo! Wus'up?")
//        flipCount += 1
//        //flipCountLabel.text = "Flips: \(flipCount)"
//
//        // Let us use the method/function we defined below: flipCard
//        flipCard(withEmoji: "🧐", on: sender)
//    }
    

    
    //Let us write our own function
    // withEmoji: external name, which is used for the caller when we use the argument; emoji: internal name
    func flipCard(withEmoji emoji: String, on button: UIButton) {
        if button.currentTitle == emoji {
            button.setTitle("", for: UIControl.State.normal)
            button.backgroundColor = #colorLiteral(red: 0.9411764741, green: 0.4980392158, blue: 0.3529411852, alpha: 1) //type color Literal and pick the color you want
        
        }
        else if emoji == "restart" {
            button.setTitle("", for: UIControl.State.normal)
            button.backgroundColor = #colorLiteral(red: 0.9411764741, green: 0.4980392158, blue: 0.3529411852, alpha: 1)
        }
        else {
            button.setTitle(emoji, for: UIControl.State.normal)
            button.backgroundColor = #colorLiteral(red: 0.1764705926, green: 0.4980392158, blue: 0.7568627596, alpha: 1)
        }
}

}

