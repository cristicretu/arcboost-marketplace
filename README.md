# Arc Boost Marketplace

This is the [Unofficial Marketplace](https://arcboost-marketplace.vercel.app/) for Arc Boosts.
![178108182-830d795c-1ba7-4a39-8201-6892d7400236 1](https://user-images.githubusercontent.com/45521157/178108354-f6d91847-65ac-4598-8258-69aec622512d.png)

1. [Downloading](#downloading)
1. [Contributing](#contributing)
3. [Running](#running)
4. [License](#license)

## Downloading

Just press on a card and it will be automatically downloaded. Unzip the file and add it to your path `/Users/*/Library/Applications/Arc/boosts/`, and you're done ✨

If you have any issues, make sure the extension is enabled through the `Manage extensions` page. 

## Contributing

To extend this marketplace, all contributions are welcome.

### Step 0

Fork this repository and create a new branch.

### Step 1

Grab your boost (extension) from Arc. There are two main ways to do that:

1. From the Boost editor
> Click on the title or settings icon on the top left, and then click `Open in Finder` in the modal
![178107343-6f12ec7a-5cf1-49c0-a234-bf4b1450d613 2](https://user-images.githubusercontent.com/45521157/178108357-7357642e-26c7-4a78-b18c-9d189d598980.png)

2. From the extensions tab
> Menu Bar -> Extensions -> Manage Extensions -> Click on your extensions' details -> Source

Afterward, ZIP the folder (Right Click -> Compress).
Now switch to your branch and add the whole zip file you just got into the `public/extensions` folder.

### Step 2

Create a `manifest.json` file for your extension. This will be used for preview purposes on the main website.
Get the template from [here](https://github.com/cristicretu/arcboost-marketplace/blob/main/template.json), then fill in the properties.
For the image, either paste it into the PR or somewhere else into GitHub, but *ensure* that the image link is `https://user-images.githubusercontent.com/...`. (i.e hosted on GitHub)

Now change the name of this file to the name of your boost. This will be used on the website. (i.e retro-github -> Retro Github)

### Step 3 

Submit the PR

## Running

```bash
git clone git@github.com:cristicretu/arcboost-marketplace.git
```

```bash
cd arcboost-marketplace && yarn # or npm -i
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## License
[MIT](LICENSE) © [Cristian Crețu](https://github.com/cristicrtu)
