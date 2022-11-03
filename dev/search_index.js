var documenterSearchIndex = {"docs":
[{"location":"man/usage/#Usage","page":"Usage","title":"Usage","text":"","category":"section"},{"location":"man/usage/#Construct-Database","page":"Usage","title":"Construct Database","text":"","category":"section"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"# Load the package\njulia> using Taxonomy\n\n# Construct a Taxonomy.DB objext from the path to each file\njulia> db = Taxonomy.DB(\"db/nodes.dmp\",\"db/names.dmp\")\nTaxonomy.DB(\"db/nodes.dmp\",\"db/names.dmp\")\n\n# Taxonomy.DB object is automatically stored in current_db()\njulia> current_db()\nTaxonomy.DB(\"db/nodes.dmp\",\"db/names.dmp\")","category":"page"},{"location":"man/usage/#Get-taxonomic-information-from-Taxon","page":"Usage","title":"Get taxonomic information from Taxon","text":"","category":"section"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"# Construct a Taxon from taxid and Taxonomy.DB\njulia> human = Taxon(9606, db)\n9606 [species] Homo sapiens\n\n# Or, you can omit db from argument (current_db() loaded)\njulia> human = Taxon(9606)\n9606 [species] Homo sapiens\n\njulia> taxid(human)\n9606\n\njulia> name(human)\n\"Homo sapiens\"\n\njulia> rank(human)\n:species","category":"page"},{"location":"man/usage/#Construct-Taxons-from-names","page":"Usage","title":"Construct Taxons from names","text":"","category":"section"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"Name must match to the scientific name excatly","category":"page"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"julia> [\"Homo\", \"Viruses\", \"Drosophila\"] .|> name2taxids |> Iterators.flatten .|> Taxon\n5-element Vector{Taxon}:\n 9605 [genus] Homo\n 10239 [superkingdom] Viruses\n 7215 [genus] Drosophila\n 2081351 [genus] Drosophila\n 32281 [subgenus] Drosophila","category":"page"},{"location":"man/usage/#Traverse-taxonomic-subtrees-from-a-given-Taxon","page":"Usage","title":"Traverse taxonomic subtrees from a given Taxon","text":"","category":"section"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"julia> children(human)\n2-element Vector{Taxon}:\n 741158 [subspecies] Homo sapiens subsp. 'Denisova'\n 63221 [subspecies] Homo sapiens neanderthalensis\n\njulia> AbstractTrees.parent(human)\n9605 [genus] Homo\n\n# Collect all Taxon in subtree using PreOderDFS iterator from AbstractTrees.jl\njulia> collect(AbastractTrees.PreOrderDFS(human))\n3-element Vector{Taxon}:\n 9606 [species] Homo sapiens\n 741158 [subspecies] Homo sapiens subsp. 'Denisova'\n 63221 [subspecies] Homo sapiens neanderthalensis\n\n# print subtree\njulia> print_tree(Taxon(9604))\n9604 [family] Hominidae\n├─ 2922387 [no rank] unclassified Hominidae\n│  └─ 2922388 [species] Hominidae sp.\n├─ 607660 [subfamily] Ponginae\n│  └─ 9599 [genus] Pongo\n│     ├─ 502961 [species] Pongo abelii x pygmaeus\n│     ├─ 9600 [species] Pongo pygmaeus\n│     │  ├─ 9602 [subspecies] Pongo pygmaeus pygmaeus\n│     │  ├─ 2753605 [subspecies] Pongo pygmaeus morio\n│     │  └─ 2753606 [subspecies] Pongo pygmaeus wurmbii\n│     ├─ 9601 [species] Pongo abelii\n│     ├─ 2624844 [no rank] unclassified Pongo\n│     │  └─ 9603 [species] Pongo sp.\n│     └─ 2051901 [species] Pongo tapanuliensis\n├─ 2883640 [no rank] Hominidae intergeneric hybrids\n│  └─ 2883641 [species] Homo sapiens x Pan troglodytes tetraploid cell line\n└─ 207598 [subfamily] Homininae\n   ├─ 9596 [genus] Pan\n   │  ├─ 9597 [species] Pan paniscus\n   │  └─ 9598 [species] Pan troglodytes\n   │     ├─ 37011 [subspecies] Pan troglodytes troglodytes\n   │     ├─ 37010 [subspecies] Pan troglodytes schweinfurthii\n   │     ├─ 756884 [subspecies] Pan troglodytes ellioti\n   │     ├─ 1294088 [subspecies] Pan troglodytes verus x troglodytes\n   │     └─ 37012 [subspecies] Pan troglodytes verus\n   ├─ 9605 [genus] Homo\n   │  ├─ 2665952 [no rank] environmental samples\n   │  │  └─ 2665953 [species] Homo sapiens environmental sample\n   │  ├─ 2813598 [no rank] unclassified Homo\n   │  │  └─ 2813599 [species] Homo sp.\n   │  ├─ 9606 [species] Homo sapiens\n   │  │  ├─ 741158 [subspecies] Homo sapiens subsp. 'Denisova'\n   │  │  └─ 63221 [subspecies] Homo sapiens neanderthalensis\n   │  └─ 1425170 [species] Homo heidelbergensis\n   └─ 9592 [genus] Gorilla\n      ├─ 9593 [species] Gorilla gorilla\n      │  ├─ 183511 [subspecies] Gorilla gorilla uellensis\n      │  ├─ 406788 [subspecies] Gorilla gorilla diehli\n      │  └─ 9595 [subspecies] Gorilla gorilla gorilla\n      └─ 499232 [species] Gorilla beringei\n         ├─ 46359 [subspecies] Gorilla beringei graueri\n         └─ 1159185 [subspecies] Gorilla beringei beringei","category":"page"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"Note: Use the child-to-parent traverse (AbstrcatTrees.parent) as much as possible since it is quite faster than parent-to-child traverse (children and iterators from AbstractTrees.jl).","category":"page"},{"location":"man/usage/#Find-lowest-common-ancestor-(LCA)","page":"Usage","title":"Find lowest common ancestor (LCA)","text":"","category":"section"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"julia> human = Taxon(9606); gorilla = Taxon(9592); orangutan = Taxon(9600);\n\njuliia> lca(human, gorilla)\n207598 [subfamily] Homininae\n\njulia> lca(human, gorilla, orangutan)\n9604 [family] Hominidaes\n\njulia> lca([human, gorilla, orangutan])\n9604 [family] Hominidae","category":"page"},{"location":"man/usage/#Evaluate-ancestor/descendant-relationships-between-two-Taxons","page":"Usage","title":"Evaluate ancestor/descendant relationships between two Taxons","text":"","category":"section"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"julia> viruses = Taxon(10239)\n10239 [superkingdom] Viruses\n\njulia> sars_cov2 = Taxon(2697049)\n2697049 [no rank] Severe acute respiratory syndrome coronavirus 2\n\njulia> isancestor(viruses, sars_cov2)\ntrue\n\njulia> isdescendant(human, viruses)\nfalse","category":"page"},{"location":"man/usage/#Filter-Taxons-from-rank-range","page":"Usage","title":"Filter Taxons from rank range","text":"","category":"section"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"julia> taxa = [2759, 33208, 7711, 40674, 9443, 9604, 9605, 9606] .|> Taxon\n8-element Vector{Taxon}:\n 2759 [superkingdom] Eukaryota\n 33208 [kingdom] Metazoa\n 7711 [phylum] Chordata\n 40674 [class] Mammalia\n 9443 [order] Primates\n 9604 [family] Hominidae\n 9605 [genus] Homo\n 9606 [species] Homo sapiens\n\n# Filter Taxons lower than a given rank\njulia> filter(taxa) do taxon\n           taxon < Rank(:class)\n       end\n4-element Vector{Taxon}:\n 9443 [order] Primates\n 9604 [family] Hominidae\n 9605 [genus] Homo\n 9606 [species] Homo sapiens\n\njulia> filter(taxa) do taxon\n           taxon <= Rank(:species)\n       end\n1-element Vector{Taxon}:\n 9606 [species] Homo sapiens","category":"page"},{"location":"man/usage/#Treat-taxonomic-Lineage","page":"Usage","title":"Treat taxonomic Lineage","text":"","category":"section"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"julia> lineage = Lineage(human)\n32-element Lineage{Taxon}:\n 1 [no Rank] root\n 131567 [no rank] cellular organisms\n 2759 [superkingdom] Eukaryota\n 33154 [clade] Opisthokonta\n 33208 [kingdom] Metazoa\n 6072 [clade] Eumetazoa\n 33213 [clade] Bilateria\n 33511 [clade] Deuterostomia\n 7711 [phylum] Chordata\n ⋮\n 9443 [order] Primates\n 376913 [suborder] Haplorrhini\n 314293 [infraorder] Simiiformes\n 9526 [parvorder] Catarrhini\n 314295 [superfamily] Hominoidea\n 9604 [family] Hominidae\n 207598 [subfamily] Homininae\n 9605 [genus] Homo\n 9606 [species] Homo sapiens","category":"page"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"Taxon information are stored in Vector-like format","category":"page"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"julia> lineage[1]\n1 [no Rank] root\n\njulia> lineage[9]\n7711 [phylum] Chordata\n\njulia> lineage[end]\n9606 [species] Homo sapiens","category":"page"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"Symbols such as :phylum, :genus and :species (Symbols in CanonicalRanks) are available to access each Taxon","category":"page"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"julia> lineage[:phylum]\n7711 [phylum] Chordata\n\njulia> lineage[:genus]\n9605 [genus] Homo\n\njulia> lineage[:species]\n9606 [species] Homo sapiens","category":"page"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"Between, From, Until, Cols and All selectors are available in more complex rank selection scenarios.","category":"page"},{"location":"man/usage/#Reformat-Lineage","page":"Usage","title":"Reformat Lineage","text":"","category":"section"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"Reformation of Linage to your ranks can be performed by using reformat().","category":"page"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"julia> seven_rank = [:superkingdom, :phylum, :class, :order, :family, :genus, :species];\n\njulia> reformat(lineage, seven_rank)\n7-element Lineage{Taxon}:\n 2759 [superkingdom] Eukaryota\n 7711 [phylum] Chordata\n 40674 [class] Mammalia\n 9443 [order] Primates\n 9604 [family] Hominidae\n 9605 [genus] Homo\n 9606 [species] Homo sapiens","category":"page"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"If there is no corresponding taxon in the lineage to your ranks, then UnclassifiedTaxon will be stored.","category":"page"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"julia> uncultured_bacillales = Taxon(157472)\n57472 [species] uncultured Bacillales bacterium\n\njulia> reformatted_bacillales_lineage = reformat(Lineage(uncultured_bacillales), seven_rank)\n7-element Lineage:\n 2 [superkingdom] Bacteria\n 1239 [phylum] Firmicutes\n 91061 [class] Bacilli\n 1385 [order] Bacillales\n Unclassified [family] unclassified Bacillales family\n Unclassified [genus] unclassified Bacillales genus\n 157472 [species] uncultured Bacillales bacterium","category":"page"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"Once reformatted, Lineage cannnot be reformatted again.","category":"page"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"julia> isreformatted(reformatted_bacillales_lineage)\ntrue\n\njulia> reformat(reformatted_bacillales_lineage, seven_rank)\nERROR: It is already reformatted.\nStacktrace:\n [1] _LR()\n   @ Taxonomy ~/.julia/dev/Taxonomy.jl/src/lineage.jl:7\n [2] reformat(l::Lineage{Union{Taxon, UnclassifiedTaxon}}, ranks::Vector{Symbol})\n   @ Taxonomy ~/.julia/dev/Taxonomy.jl/src/lineage.jl:135\n [3] top-level scope\n   @ REPL[103]:1","category":"page"},{"location":"man/usage/#Convert-Lineages-to-DataFrame","page":"Usage","title":"Convert Lineages to DataFrame","text":"","category":"section"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"Lineage can be converted to NamedTuple, using namedtuple.","category":"page"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"Converted NamedTuple can be used as input into DataFrame","category":"page"},{"location":"man/usage/","page":"Usage","title":"Usage","text":"julia> using DataFrames\n\njulia> seven_rank = [:superkingdom, :phylum, :class, :order, :family, :genus, :species];\n\njulia> taxa = [9606, 562, 187878, 212035, 2697049] .|> Taxon\n5-element Vector{Taxon}:\n 9606 [species] Homo sapiens\n 562 [species] Escherichia coli\n 187878 [species] Thermococcus gammatolerans\n 212035 [species] Acanthamoeba polyphaga mimivirus\n 2697049 [no rank] Severe acute respiratory syndrome coronavirus 2\n\njulia> taxa .|> Lineage .|> (x -> reformat(x, seven_rank)) .|> namedtuple |> DataFrame\n5×7 DataFrame\n Row │ superkingdom                   phylum                             class                             order                           family                           genus                           species                           \n     │ Taxon                          Taxon                              Taxon                             Taxon                           Taxon                            Taxon                           Taxon                             \n─────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n   1 │ 2759 [superkingdom] Eukaryota  7711 [phylum] Chordata             40674 [class] Mammalia            9443 [order] Primates           9604 [family] Hominidae          9605 [genus] Homo               9606 [species] Homo sapiens\n   2 │ 2 [superkingdom] Bacteria      1224 [phylum] Proteobacteria       1236 [class] Gammaproteobacteria  91347 [order] Enterobacterales  543 [family] Enterobacteriaceae  561 [genus] Escherichia         562 [species] Escherichia coli\n   3 │ 2157 [superkingdom] Archaea    28890 [phylum] Euryarchaeota       183968 [class] Thermococci        2258 [order] Thermococcales     2259 [family] Thermococcaceae    2263 [genus] Thermococcus       187878 [species] Thermococcus ga…\n   4 │ 10239 [superkingdom] Viruses   2732007 [phylum] Nucleocytoviric…  2732523 [class] Megaviricetes     2732554 [order] Imitervirales   549779 [family] Mimiviridae      315393 [genus] Mimivirus        212035 [species] Acanthamoeba po…\n   5 │ 10239 [superkingdom] Viruses   2732408 [phylum] Pisuviricota      2732506 [class] Pisoniviricetes   76804 [order] Nidovirales       11118 [family] Coronaviridae     694002 [genus] Betacoronavirus  694009 [species] Severe acute re…\n\n# Dealing with UnclassifiedTaxon as missing value\n\njulia> taxa = [287, 157472, 9593, 2053489] .|> Taxon\n\n# By deafult, UnclassifiedTaxon are stored \njulia> taxa .|> Lineage .|> (x -> reformat(x, seven_rank)) .|> namedtuple |> DataFrame\n4×7 DataFrame\n Row │ superkingdom                   phylum                             class                              order                              family                             genus                              species                           \n     │ Taxon                          Taxon                              Abstract…                          Abstract…                          Abstract…                          Abstract…                          Taxon                             \n─────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n   1 │ 2 [superkingdom] Bacteria      1224 [phylum] Proteobacteria       1236 [class] Gammaproteobacteria   72274 [order] Pseudomonadales      135621 [family] Pseudomonadaceae   286 [genus] Pseudomonas            287 [species] Pseudomonas aerugi…\n   2 │ 2 [superkingdom] Bacteria      1239 [phylum] Firmicutes           91061 [class] Bacilli              1385 [order] Bacillales            Unclassified [family] unclassifi…  Unclassified [genus] unclassifie…  157472 [species] uncultured Baci…\n   3 │ 2759 [superkingdom] Eukaryota  7711 [phylum] Chordata             40674 [class] Mammalia             9443 [order] Primates              9604 [family] Hominidae            9592 [genus] Gorilla               9593 [species] Gorilla gorilla\n   4 │ 2157 [superkingdom] Archaea    1655434 [phylum] Candidatus Loki…  Unclassified [class] unclassifie…  Unclassified [order] unclassifie…  Unclassified [family] unclassifi…  Unclassified [genus] unclassifie…  2053489 [species] Candidatus Lok…\n\n# If set fill_by_missing to true in namedtuple, then missing are stored in DataFrame\njulia> taxa .|> Lineage .|> (x -> reformat(x, seven_rank)) .|> (x ->  namedtuple(x; fill_by_missing=true)) |> DataFrame\n4×7 DataFrame\n Row │ superkingdom                   phylum                             class                             order                          family                            genus                    species                           \n     │ Taxon                          Taxon                              Taxon?                            Taxon?                         Taxon?                            Taxon?                   Taxon                             \n─────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n   1 │ 2 [superkingdom] Bacteria      1224 [phylum] Proteobacteria       1236 [class] Gammaproteobacteria  72274 [order] Pseudomonadales  135621 [family] Pseudomonadaceae  286 [genus] Pseudomonas  287 [species] Pseudomonas aerugi…\n   2 │ 2 [superkingdom] Bacteria      1239 [phylum] Firmicutes           91061 [class] Bacilli             1385 [order] Bacillales        missing                           missing                  157472 [species] uncultured Baci…\n   3 │ 2759 [superkingdom] Eukaryota  7711 [phylum] Chordata             40674 [class] Mammalia            9443 [order] Primates          9604 [family] Hominidae           9592 [genus] Gorilla     9593 [species] Gorilla gorilla\n   4 │ 2157 [superkingdom] Archaea    1655434 [phylum] Candidatus Loki…  missing                           missing                        missing                           missing                  2053489 [species] Candidatus Lok…","category":"page"},{"location":"#Taxonomy.jl","page":"Home","title":"Taxonomy.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: Dev)","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: CI) (Image: codecov)","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: DOI)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Taxonomy.jl is a julia package to handle NCBI-formatted taxonomic databases. The main features are:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Convert a name to taxids\nTraverse taxonomic subtrees from a given taxon\nCompute the lowest common ancestor (LCA) of given taxa\nEvaluate ancestor/descendant relationships between two taxa\nFilter taxa by rank range\nConstruct taxonomic lineage of the given taxon\nReformat lineage according to canonical ranks\nConstruct a DataFrame from lineages","category":"page"},{"location":"","page":"Home","title":"Home","text":"Now, this package only supports scientific name.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Install Taxonomy.jl as follows:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia -e 'using Pkg; Pkg.add(\"Taxonomy\")'","category":"page"},{"location":"#Download-database","page":"Home","title":"Download database","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"You need to download taxonomic data from NCBI's servers.","category":"page"},{"location":"","page":"Home","title":"Home","text":"wget ftp://ftp.ncbi.nlm.nih.gov/pub/taxonomy/taxdump.tar.gz\ntar xzvf taxdump.tar.gz","category":"page"},{"location":"man/api/#API-Reference","page":"API Reference","title":"API Reference","text":"","category":"section"},{"location":"man/api/#Public","page":"API Reference","title":"Public","text":"","category":"section"},{"location":"man/api/","page":"API Reference","title":"API Reference","text":"Modules = [Taxonomy]\nPrivate = false","category":"page"},{"location":"man/api/#Taxonomy.Lineage","page":"API Reference","title":"Taxonomy.Lineage","text":"Lineage{T<:AbstractTaxon} <: AbstractVector{T}\n\nA type that stores lineage information in Vector-like format. T represents element types, Taxon or UnclassifiedTaxon.\n\ngetindex is overloaded to get Taxon values. Symbols such as :superkingdom, :family, :genus, :species in CanonicalRanks can be used. Also, Between, From, Until, Cols and All selectors can be used in more complex rank selection scenarios.\nOnce reformatted, it cannot be reformatted again. The status can be checked using isreformatted(lineage).\n\n\n\n\n\n","category":"type"},{"location":"man/api/#Taxonomy.Rank-Tuple{AbstractTaxon}","page":"API Reference","title":"Taxonomy.Rank","text":"Rank(taxon::Taxon)\n\nReturn CanonicalRank made from rank(taxon) if rank(taxon) is in CanonicalRanks. Return UnCanonicalRank(rank) if not. CanonicalRank(taxon) can be used for isless comparison.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Taxonomy.Rank-Tuple{Symbol}","page":"API Reference","title":"Taxonomy.Rank","text":"Rank(sym::Symbol)\n\nReturn CanonicalRank(sym) if sym is in CanonicalRanks. Return UnCanonicalRank(sym) if not. CanonicalRank(sym) can be used for isless comparison.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Taxonomy.Taxon","page":"API Reference","title":"Taxonomy.Taxon","text":"Taxon(taxid::Int, db::Taxonomy.DB)\nTaxon(taxid::Int)\n\nConstruct a Taxon from its taxid. Omitting db automatically calls current_db(), which is usually the database that was last created.\n\n\n\n\n\n","category":"type"},{"location":"man/api/#AbstractTrees.children-Tuple{Taxon}","page":"API Reference","title":"AbstractTrees.children","text":"children(taxon::Taxon)\n\nReturn the vector of Taxon objects that are children of the given Taxon object.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#AbstractTrees.isdescendant-Tuple{Taxon, Taxon}","page":"API Reference","title":"AbstractTrees.isdescendant","text":"isdescendant(descendant::Taxon, ancestor::Taxon)\n\nReturn true if the former taxon is a descendant of the latter taxon.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#AbstractTrees.parent-Tuple{Taxon}","page":"API Reference","title":"AbstractTrees.parent","text":"AbstractTrees.parent(taxon::Taxon)\n\nReturn the Taxon object that is the parent of the given Taxon object.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Base.get-Tuple{Lineage, Union{Int64, Symbol}, Any}","page":"API Reference","title":"Base.get","text":"get(db::Taxonomy.DB, idx::Union{Int,Symbol}, default)\n\nReturn the Taxon object stored for the given taxid or rank (i.e. :phylum), or the given default value if no mapping for the taxid is present.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Base.get-Tuple{Taxonomy.DB, Int64, Any}","page":"API Reference","title":"Base.get","text":"get(db::Taxonomy.DB, taxid::Int, default)\n\nReturn the Taxon object stored for the given taxid, or the given default value if no mapping for the taxid is present.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Base.get-Tuple{Taxonomy.DB, String, Any}","page":"API Reference","title":"Base.get","text":"get(db::Taxonomy.DB, name::String, default)\n\nReturn the Taxon object stored for the given name, or the given default value if no mapping for the name is present.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Taxonomy.current_db!-Tuple{Taxonomy.DB}","page":"API Reference","title":"Taxonomy.current_db!","text":"current_db!(db::Taxonomy.DB)\n\nSet db as the current active database.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Taxonomy.current_db-Tuple{}","page":"API Reference","title":"Taxonomy.current_db","text":"current_db()\n\nReturn the current active database or the last database that got created.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Taxonomy.isancestor-Tuple{Taxon, Taxon}","page":"API Reference","title":"Taxonomy.isancestor","text":"isancestor(ancestor::Taxon, descendant::Taxon)\n\nReturn true if the former taxon is an ancestor of the latter taxon.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Taxonomy.isreformatted-Tuple{Lineage}","page":"API Reference","title":"Taxonomy.isreformatted","text":"isreformatted(lineage::Lineage)\n\nReturn true if lineage is already reformatted.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Taxonomy.lca-Tuple{Vector{Taxon}}","page":"API Reference","title":"Taxonomy.lca","text":"lca(taxa::Vector{Taxon})\nlca(taxa::Taxon...)\n\nReturn the Taxon object that is the lowest common ancestor of the given set of Taxons.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Taxonomy.name-Tuple{Taxon}","page":"API Reference","title":"Taxonomy.name","text":"name(taxon::AbstractTaxon)\n\nReturn the name of the given Taxon object. It also works for an UnclassifiedTaxon object.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Taxonomy.name2taxids-Tuple{AbstractString, Taxonomy.DB}","page":"API Reference","title":"Taxonomy.name2taxids","text":"name2taxids(name::AbstractString, db::Taxonomy.DB)\nname2taxids(name::AbstractString)\n\nReturn a Vector of taxid from its name. name must match to the scientific name exactly. If multiple hits are found, return a multi-element Vector. If not, 1- or 0-element Vector.  Omitting db automatically calls current_db(), which is usually the database that was last created.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Taxonomy.namedtuple-Tuple{Lineage}","page":"API Reference","title":"Taxonomy.namedtuple","text":"namedtuple(lineage::Lineage; kwargs...)\n\nReturn a NamedTuple whose filednames is ranks (in the CanonicalRanks) of the lineage. This function is useful for converting Lineage to DataFrame, for example.\n\nArguments\n\nfill_by_missing::Bool = false - If true, fills missing instead of UnclassifiedTaxon.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Taxonomy.print_lineage-Tuple{IO, Lineage}","page":"API Reference","title":"Taxonomy.print_lineage","text":"print_lineage(lineage::Lineage; kwargs...)\nprint_lineage(io::IO, lineage::Lineage; kwargs...)\n\nPrint a formatted representation of the lineage to the given IO object.\n\nArguments\n\ndelim::AbstractString = \";\" - The delimiter between taxon fields.\nfill::Bool = false - If true, prints UnclassifiedTaxon. only availavle when skip is false.\nskip::Bool = false - If true, skip printing UnclassifiedTaxon and delimiter.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Taxonomy.rank-Tuple{Taxon}","page":"API Reference","title":"Taxonomy.rank","text":"rank(taxon::AbstractTaxon)\n\nReturn the rank of the given Taxon object. It also works for an UnclassifiedTaxon object.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Taxonomy.reformat-Tuple{Lineage, Vector{Symbol}}","page":"API Reference","title":"Taxonomy.reformat","text":"reformat(l::Lineage, ranks::Vector{Symbol})\n\nReturn the Lineage object reformatted according to the given ranks. If there id no corresponding taxon in the lineage to the rank, UnclassifiedTaxon will be stored. Once a Lineage is reformatted, it cannot be reformatted again.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Taxonomy.taxid-Tuple{Taxon}","page":"API Reference","title":"Taxonomy.taxid","text":"taxid(taxon::Taxon)\n\nReturn the taxid of the given Taxon object.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#Internal","page":"API Reference","title":"Internal","text":"","category":"section"},{"location":"man/api/","page":"API Reference","title":"API Reference","text":"Modules = [Taxonomy]\nPublic = false","category":"page"},{"location":"man/api/#Taxonomy.DB","page":"API Reference","title":"Taxonomy.DB","text":"Taxonomy.DB\n\nConstructors\n\nDB(nodes_dmp::String, names_dmp::String)\n\nCreate DB(taxonomy database) object from nodes.dmp and names.dmp files.\n\n\n\n\n\n","category":"type"},{"location":"man/api/#Base.isless-Tuple{CanonicalRank, CanonicalRank}","page":"API Reference","title":"Base.isless","text":"isless(taxon::AbstractTaxon, rank::CanonicalRank)\n\nExample\n\njulia> Taxon(9606 , db) < Rank(:genus)\ntrue\n\nReturn true if the rank of the former Taxon is less than the later rank.\n\n\n\n\n\n","category":"method"}]
}
