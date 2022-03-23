# Mars Rover Kata

This repository contains a solution to the Mars Rover Kata detailed below, implemented in TypeScript using Test-Driven Development

## Introduction

You are working in an Engineering Squad for the Mars Mission, tasked with designing software to manage robots and cool vehicles for space exploration!

## The Task

You have been asked to create a program to move rovers around the surface of Mars!

The surface of Mars is represented by a Plateau, you can make the assumption that the Plateau is a square/rectangular grid for the purpose of this task.

Rovers navigate the Plateau so they can use their special cameras and robot arms to collect samples back to Planet Earth.

The Plateau is divided into a grid. A Rover’s position is represented by x and y co-ordinates and the letters N, S, W, E to represent North, South, West, East (the four cardinal compass points) respectively.

e.g. 0 0 N means the Rover is at the bottom-left corner facing in the North direction

## Instructing a Rover to Move Around the Plateau

To move a Rover around the Plateau, a string of letters is sent to a Rover.

Here are the letters and their resultant action:

L - Spins the Rover 90 degrees Left without moving from the current coordinate point

R - Spins the Rover 90 degrees Right without moving from the current coordinate point

M - Moves the Rover forward by one grid point, maintaining the same heading (i.e. from where the Rover is facing (its orientation)).

Assume that the square directly North from (x, y) is (x, y+1).

Rovers move sequentially, this means that the first Rover needs to finish moving first before the next one can move.

## Inputs into the Program

### First line of input

The first line inputted into the program represents the upper-right coordinates of the Plateau e.g. 5 5

This Plateau has maximum (x, y) co-ordinates of (5, 5).

N.B. Assume that the lower-left coordinates is (0, 0).

### Subsquent lines of input

This represents the instructions to move the rovers.

Each rover receives two lines of input.

First Line - The Rover’s position is represented by two integers representing the X and Y coordinates and a letter representing where the Rover is facing (its orientation) e.g. 1 2 N

Second Line - A string of letters representing the instructions to move the Rover around the Plateau.

## Output

For each Rover, the output represents its final position (final coordinates and where it is facing).

# Installation

First clone this repository

Install the dependencies using the command:

    npm install

Run all tests using the command:

    npm test

To run only the tests relating to the main marsRover function, change the test line in package.json to be:

    "test": "npx jest ../test/mars_rover.test.ts"

and then run:

    npm test

# Configuration

Two different solutions have been implemented, depending on whether rovers are dumb or intelligent.

A single flag for all rovers can be set by calling the function configDumb in mars_rover.ts:

- pass true for a dumb rover i.e. one that will crash if it falls off the edge of the plateau or collides with another rover

- pass false for an intelligent rover i.e. one that will detect an attempt to move beyond the edge of the plateau or into a position already occupied by another rover, and will stop processing

If no flag is specifically set, the rovers default to being intelligent.

# Assumptions

1. Although the rovers move sequentially, they are all in their start positions before any rover starts to move.

2. If a rover encounters an invalid instruction (i.e. not L, R or M) then it will stop processing and its end position will be its position at that moment. Instructions will be followed as normal for all subsequent rovers.

3. If the rover is dumb, then if it encounters any of the following, it will crash and all processing will stop.

   If the rover is intelligent, then if it encounters any of the following, it will stop processing and its end position will be its position at that moment. Instructions will be followed as normal for all subsequent rovers.

   - the next move would require the rover to travel beyond the edge of the plateau

   - the next move would require the rover to move into a square already occupied by another rover

# Possible Extensions

## Different Shapes of Plateau

A Loop interface would extend the existing Coordinate interface

Additional optional parameters loopX and loopY would determine whether movement can loop from one side to another.  
If not specified, loopX and loopY default to false, and behaviour continues as now.

This would require a change to the setPos function in the Rover class i.e.

- if the direction is E, loopX is true, and a move is attempted that would result in a x beyond the maximum x of the plateau, x is set to 0
- if the direction is W, loopX is true, and a move is attempted that would result in x < 0, x is set to the maximum x of the plateau
- if the direction is N, loopY is true, and a move is attempted that would result in a y beyond the maximum y of the plateau, y is set to 0
- if the direction is S, loopY is true, and a move is attempted that would result in y < 0, y is set to the maximum y of the plateau

This would not negate the isDumb flag: that would still be relevant for an attempt to move to a position already occupied by another rover.

## Other Rectangular Vehicles

The Rover class would require two additional optional properties: length and width.
If not specified length and width default to 0, and the behaviour continues as now.

The position of the rover would be taken to be the position of the back left wheel/corner of the rover

If the direction is N or S, each time we check for the validity of a position relative to the edge of a rectangular plateau, we need to check for:

- ( x < 0 ) or ( x + width > maximum x of plateau )
- ( y < 0 ) or ( y + length > maximum y of plateau )

If the direction is W or E, we instead need to check for:

- ( x < 0 ) or ( x + length > maximum x of plateau )
- ( y < 0 ) or ( y + width > maximum y of plateau )

When checking whether a movement would result in a position occupied by another rover:

- if the direction is N we need to consider whether the required (y + length) is occupied for any x from x to (x + width)
- if the direction is S we need to consider whether the required y is occupied for any x from x to (x + width)
- if the direction is E we need to consider whether the required (x + length) is occupied for any y from y to (y + width)
- if the driection is W we need to consider whether the required x is occupied for any y from y to (y + width)

Remember that other rovers also have a length, width and direction, so the check would need to take that into account, and not just look at the position of the other rovers' back left wheel/corner.
