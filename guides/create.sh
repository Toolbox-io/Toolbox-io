#!/bin/bash

prevDir=$(pwd)
cd $(dirname "$0")

echo -n "Guide name: "
read guideName

if ! [ -e "${guideName^^}.md" ]; then
  echo "Creating new Markdown file: ${guideName^^}.md"
  touch "${guideName^^}.md"
  echo -n "Display name: "
  read displayName
  echo -n "Icon: "
  read icon
  cat << EOF > "${guideName^^}.md"
---
DisplayName: $displayName
Icon: $icon
---
EOF
else
  echo "File ${guideName^^}.md already exists."
fi

# shellcheck disable=SC1001
# shellcheck disable=SC2086
cat << "EOF" > "${guideName}_raw.html"
<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8" />
        <meta lang="ru" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title></title>
        <script type="module" src="./api.js"></script>
        <script type="module" src="../common.js"></script>
        <script type="module">
            async function main() {
                const filename =
                    location
                        .pathname
                        .substring(
                            location
                                .pathname
                                .lastIndexOf("/") + 1
                        )
                        .replace("_raw.html", "")
                        .toUpperCase() + ".md";
                const header = await loadMarkdown(filename);
                document.title = header.DisplayName;
            }
            main();
        </script>
        <link rel="stylesheet" href="../common.css" />
        <link rel="stylesheet" href="style_md.css" />
    </head>
    <body class="markdown"></body>
</html>
EOF

mkdir -p "$guideName"

# shellcheck disable=SC2086
cat << "EOF" > "$guideName/index.html"
<!DOCTYPE html>
<!--suppress HtmlRequiredTitleElement -->
<html lang="ru">
    <head>
        <meta charset="UTF-8" />
        <meta lang="ru" />
        <script>
            const m = /((\/[^\/]*)+)(\/(.*)\/(index\.html)?)/.exec(location.pathname);
            let filename;

            if (m !== null) {
                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    if (groupIndex === 4) {
                        filename = match.toUpperCase();
                    }
                });
            }

            location.replace(
                `${
                    location.origin
                }${
                    location
                        .pathname
                        .replace(
                            /((\/[^\/]*)+)(\/(.*)\/(index\.html)?)/,
                            `$1/?guide=${filename}`
                        )
                }.md`
            );
        </script>
    </head>
</html>
EOF

cd "$prevDir"