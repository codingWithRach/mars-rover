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

First, fork and clone this repository

Then run the command: npm install

Then run the command: npm test

# Configuration

Two different solutions have been implemented, depending on whether rovers are dumb or intelligent.

A single flag for all rovers can be set by calling the function configDumb in mars_rover.ts:

- pass true for a dumb rover i.e. one that will crash if it falls off the edge of the plateau or collides with another rover

- pass false for an intelligent rover i.e. one that will detect an attempt to move beyond the edge of the plateau or into a position already occupied by another rover, and will stop processing

If no flag is specifically set, the rovers default to being intelligent.

# Assumptions

1. Although the rovers move sequentially, they are all in their start positions before any rover starts to move.

2. If a rover encounters an invalid instruction (i.e. not L, R or M) then it will stop processing and its end position will be its position at that moment.  Instructions will be followed as normal for all subsequent rovers.

2. If the rover is dumb, then if it encounters any of the following, it will crash and all processing will stop.
   
   If the rover is intelligent, then if it encounters any of the following, it will stop processing and its end position will be its position at that moment.  Instructions will be followed as normal for all subsequent rovers.
   
   - the next move would require the rover to travel beyond the edge of the plateau
 
   - the next move would require the rover to move into a square already occupied by another rover
