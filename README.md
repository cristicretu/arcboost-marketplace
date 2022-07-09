# Arc Boost Marketplace

This is the Unofficial Marketplace for Arc Boosts.

1. [Contributing](#contributing)
2. [Running](#running)
3. [License](#license)

## Contributing

In order to extend this marketplace, all contributions are welcome.

### Step 0

Fork this repository and create a new branch.

### Step 1

Grab your boost (extension) from Arc. There are two main ways to do that:

1. From the Boost editor
> Click on the title or settings icon on the top-left, and then click `Open in Finder` in the modal
![CleanShot 2022-07-09 at 4 14 18](https://user-images.githubusercontent.com/45521157/178107343-6f12ec7a-5cf1-49c0-a234-bf4b1450d613.png)

2. From the extensions tab
> Menu Bar -> Extensions -> Manage Extensions -> Click on your extensions' details -> Source

Now switch to your branch and add the whole folder you just got into the `data/extensions` folder.

### Step 2

Create a manifest JSON file for your extension. This will be used for preview purposes on the main website.
Get the template from [here](), and then fill our all the properties.
For the image, either paste it into the PR or somewhere else into GitHub, but *make sure* that the image link is `https://user-images.githubusercontent.com/...`. (i.e hosted on GitHub)

Now change the name of this file into the name of your boost. This will be used in the website. (i.e retro-github -> Retro Github)

### Step 3 

Submit the PR

## Running

```bash
git clone git@github.com:cristicretu/arcboost-marketplace.git
cd arcboost-marketplace && yarn # or npm -i
yarn dev # or npm run dev
```

## License
[MIT](LICENSE) © [Cristian Crețu](https://github.com/cristicrtu)
