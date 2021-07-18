//
//  chooseCard.swift
//  Concentration
//
//  Created by Shen Chen on 08/01/2020.
//  Copyright © 2020 MIT. All rights reserved.
//

import Foundation

class Concentration
// as long as all vars are initialized, we got free initializer for the class
{
    var cards = [Card]()
    
    func chooseCard(at index: Int) {
        
    }
    
    init(numberOfPairsOfCards: Int) {
        for _ in 1...numberOfPairsOfCards {
        // or: 0..<numberOfPairsOfCards
            //from 0 up to numberOfPairsOfCards
        
            let card = Card()
        // Card is a struct, which initializes all of its vars
            
            cards += [card, card]
//        cards.append(card)
//        cards.append(card)

    }
    // TODO: Shuffle the cards
}

}
