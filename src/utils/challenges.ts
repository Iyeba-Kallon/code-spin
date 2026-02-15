export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Challenge {
    id: string;
    title: string;
    difficulty: Difficulty;
    timeEstimate: string;
    description: string;
    points: number;
}

export const challenges: Challenge[] = [
    {
        id: 'fizzbuzz',
        title: 'FizzBuzz',
        difficulty: 'Easy',
        timeEstimate: '5m',
        description: 'Write a program that prints numbers from 1 to 100. For multiples of 3, print "Fizz", for multiples of 5, print "Buzz", and for multiples of both, print "FizzBuzz".',
        points: 10,
    },
    {
        id: 'reverse-string',
        title: 'Reverse String',
        difficulty: 'Easy',
        timeEstimate: '3m',
        description: 'Write a function that reverses a given string without using the built-in .reverse() method.',
        points: 10,
    },
    {
        id: 'debounce',
        title: 'Debounce Function',
        difficulty: 'Medium',
        timeEstimate: '15m',
        description: 'Implement a debounce function that delays the execution of a function until after a certain amount of time has passed since the last time it was invoked.',
        points: 20,
    },
    {
        id: 'palindrom-check',
        title: 'Palindrome Check',
        difficulty: 'Easy',
        timeEstimate: '5m',
        description: 'Create a function that checks if a string is a palindrome (reads the same forwards and backwards), ignoring case and non-alphanumeric characters.',
        points: 10,
    },
    {
        id: 'flatten-array',
        title: 'Flatten Array',
        difficulty: 'Medium',
        timeEstimate: '10m',
        description: 'Write a function that flattens a nested array of any depth into a single-level array.',
        points: 20,
    },
    {
        id: 'binary-search',
        title: 'Binary Search',
        difficulty: 'Medium',
        timeEstimate: '12m',
        description: 'Implement the binary search algorithm to find the index of a target element in a sorted array.',
        points: 20,
    },
    {
        id: 'lru-cache',
        title: 'LRU Cache',
        difficulty: 'Hard',
        timeEstimate: '30m',
        description: 'Design and implement a Least Recently Used (LRU) cache data structure with get and put methods.',
        points: 30,
    },
    {
        id: 'merge-sort',
        title: 'Merge Sort',
        difficulty: 'Hard',
        timeEstimate: '25m',
        description: 'Implement the merge sort algorithm to sort an array of numbers in ascending order.',
        points: 30,
    },
    {
        id: 'curry-function',
        title: 'Curry Function',
        difficulty: 'Hard',
        timeEstimate: '20m',
        description: 'Implement a function that converts a function of multiple arguments into a sequence of functions that each take a single argument.',
        points: 30,
    },
    {
        id: 'deep-clone',
        title: 'Deep Clone',
        difficulty: 'Medium',
        timeEstimate: '15m',
        description: 'Write a function that creates a deep copy of an object, handling nested objects and arrays.',
        points: 20,
    },
];
