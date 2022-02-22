import React from "react";
const styles = {
    dark: {
        background: 'black',
        color: 'white'
    },
    colored: {
        background: 'pink',
        color: 'green'
    }
}

export default function HOC(WrappedComp) {
  return function(args) {
      let temp = {};
      if(args.dark) {
        temp = styles.dark;
      } else if(args.colored) {
          temp = styles.colored;
      }
      let obj = {...args, style: temp};

      return <WrappedComp {...obj}/>
  }
}
