import { v4 as uuid } from 'uuid';

const rawProductData = {
  clothing: {
    mens: {
      jackets: [
        {
          id: uuid(),

          title: 'Firewall Rain Jacket',
          brand: 'RAB',
          description: 'Lightweight rain jacket made for intrepid hikers',
          colour: 'red',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Quest Insulated Jacket',
          brand: 'The North Face',
          description:
            'An insulated jacket which works as well in the mountains as on your commute to work',
          colour: 'Green',
          sizesAvailable: [
            ,
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Escape Softshell Jacket',
          brand: 'Vaude',
          description: 'Lightweight rain jacket made for intrepid hikers',
          colour: 'red',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
      ],
      trousers: [
        {
          id: uuid(),

          title: 'Authentic trecking trousers',
          brand: 'Lundhags',
          description: 'Lightweight trecking trousers',
          colour: 'Green',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Slim Fit Jeans',
          brand: 'Mammoth',
          description: 'Slim Fit Jeans',
          colour: 'Blue Demin',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Climbing Trousers',
          brand: 'Mammut',
          description: 'Elasticated trousers for climbing',
          colour: 'Grey',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Ultimate board shorts',
          brand: 'Ultimate Shorts',
          description: 'The best and brightest shorts you can imagine',
          colour: 'All',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
      ],
      shirts: [
        {
          id: uuid(),

          title: 'Base layer',
          brand: 'Stoic',
          description: 'Perfect base layer for all of your adventuring',
          colour: 'Blue',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Merino Long Sleve',
          brand: 'Stoic',
          description: 'Long sleve marino wool shirt',
          colour: 'Purple',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            ,
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
      ],
      shoes: [
        {
          id: uuid(),

          title: 'Renegade GTX mid',
          brand: 'LOWA',
          description: 'Goretex Mid shoe',
          colour: 'Grey/Green',
          sizesAvailable: [
            {
              sizeCode: 39,
              displayValue: '39',
            },
            {
              sizeCode: 40,
              displayValue: '40',
            },
            {
              sizeCode: 41,
              displayValue: '41',
            },
            {
              sizeCode: 42,
              displayValue: '42',
            },
            {
              sizeCode: 43,
              displayValue: '43',
            },
            {
              sizeCode: 44,
              displayValue: '44',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Predict Hike GTX mid',
          brand: 'Solomon',
          description: 'Goretex Mid shoe',
          colour: 'Light Blue',
          sizesAvailable: [
            {
              sizeCode: 39,
              displayValue: '39',
            },
            {
              sizeCode: 40,
              displayValue: '40',
            },
            {
              sizeCode: 41,
              displayValue: '41',
            },
            {
              sizeCode: 42,
              displayValue: '42',
            },
            {
              sizeCode: 43,
              displayValue: '43',
            },
            {
              sizeCode: 44,
              displayValue: '44',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Olympus 5 Hike',
          brand: 'Altra',
          description: 'Goretex Mid boot',
          colour: 'Orange/Black',
          sizesAvailable: [
            {
              sizeCode: 39,
              displayValue: '39',
            },
            {
              sizeCode: 40,
              displayValue: '40',
            },
            {
              sizeCode: 41,
              displayValue: '41',
            },
            {
              sizeCode: 42,
              displayValue: '42',
            },
            {
              sizeCode: 43,
              displayValue: '43',
            },
            {
              sizeCode: 44,
              displayValue: '44',
            },
          ],
        },
      ],
      underwear: [
        {
          id: uuid(),

          title: 'Anatomica Boxers',
          brand: 'Icebreaker',
          description: 'Merino wool boxer shorts',
          colour: 'Black',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Long John 400',
          brand: 'Woolpower',
          description: 'Merino wool long johns',
          colour: 'Black',
          sizesAvailable: [
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
      ],
    },
    womens: {
      jackets: [
        {
          id: uuid(),

          title: 'Firewall Rain Jacket',
          brand: 'RAB',
          description: 'Lightweight rain jacket made for intrepid hikers',
          colour: 'red',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Quest Insulated Jacket',
          brand: 'The North Face',
          description:
            'An insulated jacket which works as well in the mountains as on your commute to work',
          colour: 'Green',
          sizesAvailable: [
            ,
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Escape Softshell Jacket',
          brand: 'Vaude',
          description: 'Lightweight rain jacket made for intrepid hikers',
          colour: 'red',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
      ],
      trousers: [
        {
          id: uuid(),

          title: 'Authentic trecking trousers',
          brand: 'Lundhags',
          description: 'Lightweight trecking trousers',
          colour: 'Green',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Slim Fit Jeans',
          brand: 'Mammoth',
          description: 'Slim Fit Jeans',
          colour: 'Blue Demin',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Climbing Trousers',
          brand: 'Mammut',
          description: 'Elasticated trousers for climbing',
          colour: 'Grey',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Ultimate board shorts',
          brand: 'Ultimate Shorts',
          description: 'The best and brightest shorts you can imagine',
          colour: 'All',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
      ],
      shirts: [
        {
          id: uuid(),

          title: 'Base layer',
          brand: 'Stoic',
          description: 'Perfect base layer for all of your adventuring',
          colour: 'Blue',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Merino Long Sleve',
          brand: 'Stoic',
          description: 'Long sleve marino wool shirt',
          colour: 'Purple',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            ,
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
      ],
      shoes: [
        {
          id: uuid(),

          title: 'Renegade GTX mid',
          brand: 'LOWA',
          description: 'Goretex Mid shoe',
          colour: 'Grey/Green',
          sizesAvailable: [
            {
              sizeCode: 39,
              displayValue: '39',
            },
            {
              sizeCode: 40,
              displayValue: '40',
            },
            {
              sizeCode: 41,
              displayValue: '41',
            },
            {
              sizeCode: 42,
              displayValue: '42',
            },
            {
              sizeCode: 43,
              displayValue: '43',
            },
            {
              sizeCode: 44,
              displayValue: '44',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Predict Hike GTX mid',
          brand: 'Solomon',
          description: 'Goretex Mid shoe',
          colour: 'Light Blue',
          sizesAvailable: [
            {
              sizeCode: 39,
              displayValue: '39',
            },
            {
              sizeCode: 40,
              displayValue: '40',
            },
            {
              sizeCode: 41,
              displayValue: '41',
            },
            {
              sizeCode: 42,
              displayValue: '42',
            },
            {
              sizeCode: 43,
              displayValue: '43',
            },
            {
              sizeCode: 44,
              displayValue: '44',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Olympus 5 Hike',
          brand: 'Altra',
          description: 'Goretex Mid boot',
          colour: 'Orange/Black',
          sizesAvailable: [
            {
              sizeCode: 39,
              displayValue: '39',
            },
            {
              sizeCode: 40,
              displayValue: '40',
            },
            {
              sizeCode: 41,
              displayValue: '41',
            },
            {
              sizeCode: 42,
              displayValue: '42',
            },
            {
              sizeCode: 43,
              displayValue: '43',
            },
            {
              sizeCode: 44,
              displayValue: '44',
            },
          ],
        },
      ],
      underwear: [
        {
          id: uuid(),

          title: 'Merino Mesh Leggings',
          brand: 'Stoic',
          description: 'Merino wool leggings',
          colour: 'Black',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Merino Undershirt',
          brand: 'Angel',
          description: 'Merino wool under shirt',
          colour: 'White',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
        {
          id: uuid(),

          title: '185 Wool Sports Bra',
          brand: 'Ortovox',
          description: 'Merino wool sports bra',
          colour: 'Grey / Orange',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'small',
            },
            {
              sizeCode: 2,
              displayValue: 'medium',
            },
            {
              sizeCode: 3,
              displayValue: 'large',
            },
          ],
        },
      ],
    },
  },
  climbing: {
    shoes: {
      velcro: [
        {
          id: uuid(),

          title: 'Solutions',
          brand: 'La Sportiva',
          description: 'No edge shoes',
          colour: 'Yellow',
          sizesAvailable: [
            {
              sizeCode: 38,
              displayValue: '38',
            },
            {
              sizeCode: 39,
              displayValue: '39',
            },
            {
              sizeCode: 40,
              displayValue: '40',
            },
            {
              sizeCode: 41,
              displayValue: '41',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Instincts',
          brand: 'Scarpa',
          description: 'Downturned porformance shoe',
          colour: 'Black / Orange',
          sizesAvailable: [
            {
              sizeCode: 38,
              displayValue: '38',
            },
            {
              sizeCode: 39,
              displayValue: '39',
            },
            {
              sizeCode: 40,
              displayValue: '40',
            },
            {
              sizeCode: 41,
              displayValue: '41',
            },
          ],
        },
      ],
      laceup: [
        {
          id: uuid(),

          title: 'Final',
          brand: 'La Sportiva',
          description: 'Good all day show',
          colour: 'Orange',
          sizesAvailable: [
            {
              sizeCode: 38,
              displayValue: '38',
            },
            {
              sizeCode: 39,
              displayValue: '39',
            },
            {
              sizeCode: 40,
              displayValue: '40',
            },
            {
              sizeCode: 41,
              displayValue: '41',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Insticts lace up',
          brand: 'Scarpa',
          description: 'Lace up instincts',
          colour: 'Black',
          sizesAvailable: [
            {
              sizeCode: 38,
              displayValue: '38',
            },
            {
              sizeCode: 39,
              displayValue: '39',
            },
            {
              sizeCode: 40,
              displayValue: '40',
            },
            {
              sizeCode: 41,
              displayValue: '41',
            },
          ],
        },
      ],
    },
    ropes: {
      single: [
        {
          id: uuid(),

          title: 'Jampa',
          brand: 'Beal',
          description: 'Budget indoor rope',
          colour: 'Yellow',
          sizesAvailable: [
            {
              sizeCode: 30,
              displayValue: '30m',
            },
            {
              sizeCode: 40,
              displayValue: '40m',
            },
            {
              sizeCode: 60,
              displayValue: '60m',
            },
          ],
        },
        {
          id: uuid(),

          title: 'SE Priti 9.6mm',
          brand: 'Edlerid',
          description: 'Great outdoor rope',
          colour: 'Yellow',
          sizesAvailable: [
            {
              sizeCode: 40,
              displayValue: '40m',
            },
            {
              sizeCode: 60,
              displayValue: '60m',
            },
            {
              sizeCode: 80,
              displayValue: '80m',
            },
          ],
        },
      ],
      twin: [
        {
          id: uuid(),

          title: 'Swift Protect Pro Dry 8.9',
          brand: 'Edelrid',
          description: 'Great rope for all your trad adventures',
          colour: 'Green',
          sizesAvailable: [
            {
              sizeCode: 30,
              displayValue: '30m',
            },
            {
              sizeCode: 40,
              displayValue: '40m',
            },
            {
              sizeCode: 60,
              displayValue: '60m',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Fanatic Dry 8.4',
          brand: 'Fixed',
          description: 'Light weight half rope',
          colour: 'Yellow',
          sizesAvailable: [
            {
              sizeCode: 30,
              displayValue: '30m',
            },
            {
              sizeCode: 40,
              displayValue: '40m',
            },
            {
              sizeCode: 60,
              displayValue: '60m',
            },
          ],
        },
      ],
    },
    tradgear: {
      nuts: [
        {
          id: uuid(),

          title: 'Wall Nuts',
          brand: 'Black Diamond',
          description: 'Great nuts for climbing',
          colour: 'Mixed',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: '1',
            },
            {
              sizeCode: 2,
              displayValue: '2',
            },
            {
              sizeCode: 3,
              displayValue: '3',
            },
          ],
        },
        {
          id: uuid(),

          title: 'Wall Nut Set',
          brand: 'Black Diamond',
          description: 'Great nuts for climbing',
          colour: 'Mixed',
          sizesAvailable: [
            {
              sizeCode: 1,
              displayValue: 'half set',
            },
            {
              sizeCode: 2,
              displayValue: 'full set',
            },
          ],
        },
      ],
      cams: [
        {
          id: uuid(),

          title: 'Camalot C4',
          brand: 'Black Diamond',
          description: 'Cams for any crack',
          colour: 'Mixed',
          sizesAvailable: [
            {
              sizeCode: 0.5,
              displayValue: '0.5',
            },
            {
              sizeCode: 1,
              displayValue: '1',
            },
            {
              sizeCode: 2,
              displayValue: '2',
            },
            {
              sizeCode: 3,
              displayValue: '3',
            },
            {
              sizeCode: 4,
              displayValue: '4',
            },
            {
              sizeCode: 5,
              displayValue: '5',
            },
          ],
        },
      ],
    },
  },
};

export default rawProductData;
