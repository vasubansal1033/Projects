package main

import (
	"fmt"
)

func linearSearch(dataList []int, key int) bool {

	for _, item := range dataList {
		if item == key {
			return true
		}
	}
	return false
}

func main() {
	arr := []int{1, 2, 3, 4, 5}
	fmt.Println(linearSearch(arr, -1))
}
