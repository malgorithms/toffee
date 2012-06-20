//
//
// grammar file for Dude Templating
//
//

%lex
%%

"{#"                      return 'START_COFFEE';
"#}"                      return 'END_COFFEE';
":"[\t\r\n ]*"{{"         return 'START_INDENTED_DUDE'
"{{"                      return 'START_DUDE';
"}}"                      return 'END_DUDE';
[^{}#\\:]+|[\\{}#:]       return 'CODE';
<<EOF>>                   return 'EOF';

/lex

%start starter

%%

starter 
  :
    dude_zone EOF            { $$ = $1; return $$;}
  ;

dude_zone 
  :
    dude_code                               { $$ = [$1]; }
  |
    dude_code flip_to_coffee dude_zone      { $$ = $3; $3.splice(0,0,$1); for (var i = 0; i < $2.length; i++) { $3.splice(1+i,0,$2[i]);  } }
  |
    flip_to_coffee dude_zone                { $$ = $1; for (var i = 0; i < $2.length; i++) { $$.push($2[i]);  } }
  ;

flip_to_coffee
  :
    START_COFFEE coffee_zone END_COFFEE  { $$ = $2; }
  ;

coffee_zone 
  :
    coffee_code                              { $$ = [$1]; }
  |
    coffee_code flip_to_dude coffee_zone     { $$ = $3; $3.splice(0,0,$1); for (var i = 0; i < $2.length; i++) { $3.splice(1+i,0,$2[i]);  } }
  |
    flip_to_dude coffee_zone                 { $$ = $1; for (var i = 0; i < $2.length; i++) { $$.push($2[i]);  } }
  ;

flip_to_dude
  :
    START_DUDE dude_zone END_DUDE            { $$ = $2; }
  |
    START_INDENTED_DUDE dude_zone END_DUDE   { $$ = $2; $2.splice(0,0,["INDENT"]); $2.push(["OUTDENT"]); }
  ;


dude_code
  :
  code                  { $$ = ["DUDE", $1]; }
  ;

coffee_code
  :
  code                  { $$ = ["COFFEE", $1]; }
  ;


code
  :
    CODE                                 { $$ = $1; }
  |
    code CODE                            { $$ = $1 + $2; }
  ;
