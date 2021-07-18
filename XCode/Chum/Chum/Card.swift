//
//  Card.swift
//  Chum
//
//  Created by Shen Chen on 08/01/2020.
//  Copyright © 2020 MIT. All rights reserved.
//

import Foundation

// struct: no inheritance; value types (it gets copied; arrays, int, dictionary are structs, which needs to be copied)
// class: reference types (the thing lives in the heap; when passing, we are passing pointers)
struct Card
{
    var isFaceup = false
    var isMatched = false
    var idenfitier: Int
}
