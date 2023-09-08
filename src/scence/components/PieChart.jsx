import { useMediaQuery, useTheme } from '@mui/material';
import { ResponsivePie } from '@nivo/pie'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { tokens } from '../../theme';

const fetchData= async()=>{
 
  console.log("Fetching")
  const response=await axios.get('/home/clients');

  if(response.statusText === "OK")
  {
    return response.data;
  }

}


function PieChart({isDashboard}) {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [pieData,setPieData]=useState([]);
  var tempActive=0;
  var tempEnded=0;
  var tempFrozen=0;
  var tempCanceld=0;
  var tempTotal =0;

  const theme=useTheme();
const colors=tokens(theme.palette.mode);
  const {isError,isSuccess,isLoading,data:clients,error} = useQuery(
    ["clients"],
    fetchData,
      {staleTime:Infinity}
  );
const data=[
  {
    "id": "make",
    "label": "make",
    "value": 538,
    "color": "red"
  },
  {
    "id": "elixir",
    "label": "elixir",
    "value": 469,
    "color": "white"
  },
  {
    "id": "haskell",
    "label": "haskell",
    "value": 61,
    "color": "hsl(261, 70%, 50%)"
  },
  {
    "id": "erlang",
    "label": "erlang",
    "value": 451,
    "color": "hsl(60, 70%, 50%)"
  },
  {
    "id": "Python",
    "label": "Python",
    "value": 548,
    "color": "hsl(282, 70%, 50%)"
  }
]

  useEffect(()=>{
    clients?.forEach((client)=>{
        if(client.status === 'Active')
        {
          tempActive+=1;
        }
        if(client.status === 'Ended')
        {
          tempEnded+=1;
        }
        if(client.status === 'Frozen')
        {
          tempFrozen+=1;
        }
        if(client.status === 'Canceld')
        {
          tempCanceld+=1;
        }
        
    })
    
  
    setPieData([
      {
        "id": "فعال",
        "label": "فعال",
        "value": tempActive,
        "color":  "hsla(138, 84%, 49%, 1)"
      },
      {
        "id": "منتهي",
        "label": "منتهي",
        "value": tempEnded,
        "color": "hsla(352, 96%, 57%, 1)"
      },
      {
        "id": "مجمد",
        "label": "مجمد",
        "value": tempFrozen,
        "color": "hsla(187, 96%, 57%, 1)"
      },
      {
        "id": "ملغي",
        "label": "ملغي",
        "value": tempCanceld,
        "color": "hsla(358, 94%, 22%, 1)"
      },
  
     ])
    tempActive=0;
    tempEnded=0;
     tempFrozen=0;
   tempCanceld=0;
},[clients])
useEffect(()=>{
  clients?.forEach((client)=>{
      if(client.status === 'Active')
      {
        tempActive+=1;
      }
      if(client.status === 'Ended')
      {
        tempEnded+=1;
      }
      if(client.status === 'Frozen')
      {
        tempFrozen+=1;
      }
      if(client.status === 'Canceld')
      {
        tempCanceld+=1;
      }
        tempTotal+=1;
  })
  

  setPieData([
    {
      "id": "فعال",
      "label": "فعال",
      "value": tempActive,
      "color":  "hsla(138, 84%, 49%, 1)"
    },
    {
      "id": "منتهي" ,
      "label": "         منتهي",
      "value": tempEnded,
      "color": "hsla(352, 96%, 57%, 1)"
    },
    {
      "id": "مجمد",
      "label": "مجمد",
      "value": tempFrozen,
      "color": "hsla(187, 96%, 57%, 1)"
    },
    {
      "id": "ملغي",
      "label": "ملغي",
      "value": tempCanceld,
      "color": "hsla(358, 94%, 22%, 1)"
    },

   ])
    tempActive=0;
    tempEnded=0;
     tempFrozen=0;
   tempCanceld=0;

},[])

  return (
    <ResponsivePie
        data={pieData}
        margin={isDashboard ? {top: isNonMobile? 70 :30, right:isNonMobile? 120 : 20, bottom:isNonMobile? 70 : 90, left:isNonMobile? 120 : 20 } : 
        { top: isNonMobile? 80 :-240, right:isNonMobile? 120 : 20, bottom:isNonMobile? 150 : 90, left:isNonMobile? 120 : 20 } }
        
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ datum: 'data.color' }}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                 
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={isDashboard?[]:[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#000',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 25,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
  )
}

export default PieChart