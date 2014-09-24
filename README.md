# AdDetector

AdDetector is a Chrome and Firefox addon that flags articles with corporate sponsors by putting a banner above articles which may mislead the reader.

"Corporate content" is present in publications like the New York Times, Newsweek, The Atlantic, Buzzfeed, and others. Stories are sometimes marked as sponsored, but these indicators are sometimes very subtle, leaving many users unaware that the article is sponsored.

AdDetector contains rules to identify small "sponsored" markings. In some cases, these indicators are not even visible normally and instead are hidden in the source code of the webpage.

## Install for Chrome or Firefox

Get the latest download links on the [AdDetector site](http://ianww.com/ad-detector).

## Running from source

Start by running `./setup_hardlinks`.

The hardlinks connect generic code in `src/` to the proper locations in browser-specific subdirectories (browsers won't follow symlinks).  To make changes to injected code, you only need to edit files under `src/`.

Next, run the extension locally in your browser of choice.  For Chrome, go to chrome://extensions, enable developer mode, and load the `chrome/` directory.  For Firefox, set up your sdk and run `cfx run` in the `firefox/` directory.

## Contributing

I value contributions.  Looking for an easy way to get involved?  Add a [rule](https://github.com/typpo/ad-detector/blob/master/src/rules.js) for a site currently not covered by AdDetector, or check out the issues page.  Please open pull requests on this Github repository.

## License (MIT)

Copyright (C) 2014 by Ian Webster

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
