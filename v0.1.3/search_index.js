var documenterSearchIndex = {"docs":
[{"location":"#Taxonomy.jl","page":"Home","title":"Taxonomy.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: Stable) (Image: Dev) (Image: Build Status)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Taxonomy.jl is a julia package to handle NCBI-formatted taxonomic databases.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Now, this package only supports scientific name.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Install Taxonomy.jl as follows:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia -e 'using Pkg; Pkg.add(\"Taxonomy\")'","category":"page"},{"location":"#Usage","page":"Home","title":"Usage","text":"","category":"section"},{"location":"#Download-database","page":"Home","title":"Download database","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"First, you need to download taxonomic data from NCBI's servers.","category":"page"},{"location":"","page":"Home","title":"Home","text":"wget ftp://ftp.ncbi.nlm.nih.gov/pub/taxonomy/taxdump.tar.gz\ntar xzvf taxdump.tar.gz","category":"page"},{"location":"#Create-Taxonomy.DB-object","page":"Home","title":"Create Taxonomy.DB object","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"You can create Taxonomy.DB object to store the data.","category":"page"},{"location":"","page":"Home","title":"Home","text":"# Load the package\njulia> using Taxonomy\n\njulia> db = Taxonomy.DB(\"db/nodes.dmp\",\"db/names.dmp\") # Create a Taxonomy.DB objext from the path to each file\n\njulia> db = Taxonomy.DB(\"/your/path/to/db\",\"nodes.dmp\",\"names.dmp\") # Alternatively, create the object from the path to the directory and the name of each files","category":"page"},{"location":"#Taxon","page":"Home","title":"Taxon","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"You can construct a Taxon object from its taxonomic identifier and the Taxonomy.DB object.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> human = Taxon(9606, db) # species Homo sapiens\n9606 [species] Homo sapiens\n\njulia> gorilla = Taxon(9593, db) # species Gorilla gorilla\n9593 [species] Gorilla gorilla\n\njulia> bacillus = Taxon(1386,db) # genus Bacillus\n1386 [genus] Bacillus","category":"page"},{"location":"","page":"Home","title":"Home","text":"Each Taxon object has 4-field taxid, name, rank and db.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> @show human\nhuman = 9606 [species] Homo sapiens\n\njulia> @show human.taxid\nhuman.taxid = 9606\n\njulia> @show human.name\nhuman.name = \"Homo sapiens\"\n\njulia> @show human.rank\nhuman.rank = :species\n\njulia> @show human.db\nhuman.db = Taxonomy.DB(\"db/nodes.dmp\",\"db/names.dmp\")","category":"page"},{"location":"","page":"Home","title":"Home","text":"You can get a variety of information, such as rank, parent and children by using functions.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> rank(gorilla)\n:species\n\njulia> parent(gorilla)\n9592 [genus] Gorilla","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> children(bacillus)\n249-element Array{Taxon,1}:\n 427072 [species] Bacillus chagannorensis\n 904295 [species] Bacillus ginsengisoli\n 1522318 [species] Bacillus kwashiorkori\n 1245522 [species] Bacillus thermophilus\n 1178786 [species] Bacillus thaonhiensis\n 1805474 [species] Bacillus mediterraneensis\n ⋮\n 324768 [species] Bacillus idriensis\n 745819 [species] Bacillus alkalicola\n 170350 [species] Bacillus deramificans\n 1522308 [species] Bacillus niameyensis\n 324767 [species] Bacillus infantis","category":"page"},{"location":"","page":"Home","title":"Home","text":"Also, you can get the lowest common ancestor (LCA) of taxa.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> lca(human, gorilla)\n207598 [subfamily] Homininae\n\njulia> lca(human, gorilla, bacillus) # You can input as many as you want.\n131567 [no rank] cellular organisms\n\njulia> lca([human, gorilla, bacillus]) # Vector of taxon is also ok.\n131567 [no rank] cellular organisms","category":"page"},{"location":"","page":"Home","title":"Home","text":"Fuctions from AbstractTrees.jl can also be used.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> homininae = lca(human, gorilla)\njulia> print_tree(homininae)\n207598 [subfamily] Homininae\n├─ 9596 [genus] Pan\n│  ├─ 9597 [species] Pan paniscus\n│  └─ 9598 [species] Pan troglodytes\n│     ├─ 37010 [subspecies] Pan troglodytes schweinfurthii\n│     ├─ 37011 [subspecies] Pan troglodytes troglodytes\n│     ├─ 1294088 [subspecies] Pan troglodytes verus x troglodytes\n│     ├─ 91950 [subspecies] Pan troglodytes vellerosus\n│     ├─ 756884 [subspecies] Pan troglodytes ellioti\n│     └─ 37012 [subspecies] Pan troglodytes verus\n├─ 9605 [genus] Homo\n│  ├─ 9606 [species] Homo sapiens\n│  │  ├─ 63221 [subspecies] Homo sapiens neanderthalensis\n│  │  └─ 741158 [subspecies] Homo sapiens subsp. 'Denisova'\n│  ├─ 1425170 [species] Homo heidelbergensis\n│  └─ 2665952 [no rank] environmental samples\n│     └─ 2665953 [species] Homo sapiens environmental sample\n└─ 9592 [genus] Gorilla\n   ├─ 499232 [species] Gorilla beringei\n   │  ├─ 1159185 [subspecies] Gorilla beringei beringei\n   │  └─ 46359 [subspecies] Gorilla beringei graueri\n   └─ 9593 [species] Gorilla gorilla\n      ├─ 183511 [subspecies] Gorilla gorilla uellensis\n      ├─ 406788 [subspecies] Gorilla gorilla diehli\n      └─ 9595 [subspecies] Gorilla gorilla gorilla","category":"page"},{"location":"#Lineage","page":"Home","title":"Lineage","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Lineage information can be acquired by using Lineage().","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> lineage = Lineage(gorilla)\n32-element Lineage:\n 1 [no rank] root\n 131567 [no rank] cellular organisms\n 2759 [superkingdom] Eukaryota\n 33154 [clade] Opisthokonta\n 33208 [kingdom] Metazoa\n 6072 [clade] Eumetazoa\n 33213 [clade] Bilateria\n ⋮\n 314293 [infraorder] Simiiformes\n 9526 [parvorder] Catarrhini\n 314295 [superfamily] Hominoidea\n 9604 [family] Hominidae\n 207598 [subfamily] Homininae\n 9592 [genus] Gorilla\n 9593 [species] Gorilla gorilla","category":"page"},{"location":"","page":"Home","title":"Home","text":"Struct Lineage stores linage informaction in Vector-like format.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> lineage[1]\n1 [no rank] root\n\njulia> lineage[9]\n7711 [phylum] Chordata\n\njulia> lineage[end]\n9593 [species] Gorilla gorilla","category":"page"},{"location":"","page":"Home","title":"Home","text":"You can also access a Taxon in the Lineage using Symbol, such as :superkingdom, :family, :genus, :species and etc.(Only Symbols in CanonicalRank can be used).","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> CanonicalRank\n10-element Array{Symbol,1}:\n :superkingdom\n :kingdom\n :phylum\n :class\n :order\n :family\n :genus\n :species\n :subspecies\n :strain\n\njulia> lineage[:order]\n9443 [order] Primates\n\njulia> lineage[:genus]\n9592 [genus] Gorilla","category":"page"},{"location":"","page":"Home","title":"Home","text":"You can use Between, From, Until, Cols and All selectors in more complex rank selection scenarios.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> lineage[Between(:order,:genus)]\n8-element Lineage:\n 9443 [order] Primates\n 376913 [suborder] Haplorrhini\n 314293 [infraorder] Simiiformes\n 9526 [parvorder] Catarrhini\n 314295 [superfamily] Hominoidea\n 9604 [family] Hominidae\n 207598 [subfamily] Homininae\n 9592 [genus] Gorilla\n\njulia> lineage[From(:family)]\n4-element Lineage:\n 9604 [family] Hominidae\n 207598 [subfamily] Homininae\n 9592 [genus] Gorilla\n 9593 [species] Gorilla gorilla\n\njulia> lineage[Until(:class)]\n19-element Lineage:\n 1 [no rank] root\n 131567 [no rank] cellular organisms\n 2759 [superkingdom] Eukaryota\n 33154 [clade] Opisthokonta\n 33208 [kingdom] Metazoa\n 6072 [clade] Eumetazoa\n 33213 [clade] Bilateria\n ⋮\n 117570 [clade] Teleostomi\n 117571 [clade] Euteleostomi\n 8287 [superclass] Sarcopterygii\n 1338369 [clade] Dipnotetrapodomorpha\n 32523 [clade] Tetrapoda\n 32524 [clade] Amniota\n 40674 [class] Mammalia","category":"page"},{"location":"","page":"Home","title":"Home","text":"Reformation of the lineage to your ranks can be performed by using reformat().","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> myrank = [:superkingdom, :phylum, :class, :order, :family, :genus, :species]\n\njulia> reformat(lineage, myrank)\n7-element Lineage:\n 2759 [superkingdom] Eukaryota\n 7711 [phylum] Chordata\n 40674 [class] Mammalia\n 9443 [order] Primates\n 9604 [family] Hominidae\n 9592 [genus] Gorilla\n 9593 [species] Gorilla gorilla","category":"page"},{"location":"","page":"Home","title":"Home","text":"If there is no corresponding taxon in the lineage to your ranks, then UnclassifiedTaxon will be stored.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> uncultured_bacillales = Taxon(157472,db)\n57472 [species] uncultured Bacillales bacterium\n\njulia> reformated = reformat(Lineage(uncultured_bacillales), myrank)\n7-element Lineage:\n 2 [superkingdom] Bacteria\n 1239 [phylum] Firmicutes\n 91061 [class] Bacilli\n 1385 [order] Bacillales\n Unclassified [family] unclassified Bacillales family\n Unclassified [genus] unclassified Bacillales genus\n 157472 [species] uncultured Bacillales bacterium","category":"page"}]
}
