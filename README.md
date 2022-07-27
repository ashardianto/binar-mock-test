This is a Binar-Frontend-Mock-Test project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the package manager:

yarn

After finished, run dev

yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

As mentioned in the assessment test, i made 6 services:

a. Create User
b. Login
c. Show Product
d. Create Product
e. Update Product
f. Delete Product

Create user: click Register in landing page.
Login: click Login in landing page.
Show Product: Right after login, user redirected to dashboard and now can see products available.
Create Product: Click "Create New" button on Navbar, and simply add new product you want to list.

## Usage Issues:

I found some issues in E & F point, both had the same issues which is related to CORS Error.

- What've i tried:
  Adding proxy with heroku: didn't work
  Adding headers (as you can see in the product.js): didn't work
  Using both cookies & localStorage to save the access_token: didn't work

- Temporary solutions:
  Disabling chrome security using

Windows : Windows + R --> chrome --disable-web-security --user-data-dir

MacOS : open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials

Adding and using chrome extension : https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc/related?hl=en-GB
