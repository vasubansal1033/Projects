package main

import (
	"fmt"
)

func printBar(arr [5]int) {
	var max int = 0

	for i := 0; i < len(arr); i++ {
		if max < arr[i] {
			max = arr[i]
		}
	}

	for i := max; i >= 0; i-- {
		var str string = ""
		for j := 0; j < len(arr); j++ {
			if arr[j] <= i {
				str = str + " \t"
			} else {
				str = str + "*\t"
			}
		}

		fmt.Println(str)
	}
}

func main() {
	arr := [5]int{5,3,2,5,4}
	printBar(arr)
}
