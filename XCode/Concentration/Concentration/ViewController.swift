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
    
    lazy var game = Concentration(numberOfPairsOfCards: (cardButons.count + 1)/2)
    
    
    // cannot do property observers in lazy vars
    
    
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
    // action: creates a method// the exclamation is super important
    
    @IBOutlet weak var flipCountLabel: UILabel!
    // swift arrays

    
    @IBOutlet var cardButons: [UIButton]!
    
    // var emojiChoices: Array<String> = ["🤪", "🧐", "🤓", "😎"]
    
    // a swift method in the class
    @IBAction func touchCard(_ sender: UIButton) {
    // IBAction is not the method; it is a special directive for the round circle on the left
    // func is the function, which is followed by the name of the function
    // name of the argument parameter: _ sender
    // UIButton is the type of the argument, which is a UI button
    // we can do: @IBAction func touchCard(_ sender: UIButton) -> Int {} if we wanna return an integer
//        print("Yo! Wus'up?")

        
        // Let us use the method/function we defined below: flipCard
        //flipCard(withEmoji: "❡", on: sender)
//        print("prevIndex = \(prevIndex)")
        flipCount += 1 // count the flip count
        //flipCountLabel.text = "Flips: \(flipCount)" //update the instance variable
        
        if let cardNumber = cardButons.firstIndex(of: sender) {
            game.chooseCard(at: cardNumber)
            updateViewFromModel()
        } else {
            print("Chosen card was not in cardButtons")
        }
        
    }

        
        func updateViewFromModel() {
            for index in cardButons.indices {
                let button = cardButons[index]
                let card = game.cards[index]
                if card.isFaceUp {
                    button.setTitle(emoji(for: card), for: UIControl.State.normal)
                    button.backgroundColor = #colorLiteral(red: 0.1764705926, green: 0.4980392158, blue: 0.7568627596, alpha: 1)
                } else {
                    button.setTitle("", for: UIControl.State.normal)
                    button.backgroundColor = card.isMatched ? #colorLiteral(red: 0.5157826543, green: 0.5140333772, blue: 0.5171524286, alpha: 0) : #colorLiteral(red: 1, green: 0.5622442365, blue: 0, alpha: 1) //type color Literal and pick the color you want
                }
            }
        }

        var emojiChoices = ["🤓", "🤪", "😎", "🧐"]
        
        func emoji(for card: Card) -> String {
            return "?"
        }

        // !: helps define an optional type
        
        
        
    
    


    
//    //Let us write our own function
//    // withEmoji: external name, which is used for the caller when we use the argument; emoji: internal name
//    func flipCard(withEmoji emoji: String, on button: UIButton) {
//        if button.currentTitle == emoji {
//            button.setTitle("", for: UIControl.State.normal)
//            button.backgroundColor = #colorLiteral(red: 1, green: 0.5622442365, blue: 0, alpha: 1) //type color Literal and pick the color you want
//        }
//        else {
//            button.setTitle(emoji, for: UIControl.State.normal)
//            button.backgroundColor = #colorLiteral(red: 0.1764705926, green: 0.4980392158, blue: 0.7568627596, alpha: 1)
//        }
//}

}


