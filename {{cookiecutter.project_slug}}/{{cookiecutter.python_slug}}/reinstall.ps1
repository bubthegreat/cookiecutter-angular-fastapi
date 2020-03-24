Remove-Item -Recurse -Force dist
python setup.py sdist
$distfile = Get-ChildItem ./dist | Select-Object -first 1
pip install ./dist/$distfile