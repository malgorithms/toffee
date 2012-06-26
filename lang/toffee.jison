//
//
// grammar file for Toffee Templating
//
//

%lex
%%

"{##"                     return 'START_TOFFEE_COMMENT';
"##}"                     return 'END_TOFFEE_COMMENT';
"{#"                      return 'START_COFFEE';
"#}"                      return 'END_COFFEE';
":"[\t\r\n ]*"{:"         return 'START_TOFFEE';
"{:"                      return 'START_INDENTED_TOFFEE';
":}"                      return 'END_TOFFEE';
[^{}#\\:]+|[\\{}#:]       return 'CODE';
<<EOF>>                   return 'EOF';

/lex

%start starter

%%

starter 
  :
    toffee_zone EOF            { $$ = ["TOFFEE_ZONE", $1]; return $$;}
  ;

toffee_zone 
  :
    toffee_code                                 { $$ = [$1]; }
  |
    toffee_code flip_to_coffee toffee_zone        { $$ = $3; $3.splice(0,0,$1,$2); }
  |
    flip_to_coffee toffee_zone                  { $$ = $2; $2.splice(0,0,$1); }
  |
    toffee_code flip_to__toffeecomment toffee_zone  { $$ = $3; $3.splice(0,0,$1); }
  |
    flip_to__toffeecomment toffee_zone            { $$ = $2; $2.splice(0,0,$1); }
  |
                                              { $$ = []; }
  ;

flip_to__toffeecomment
  :
  START_TOFFEE_COMMENT code END_TOFFEE_COMMENT  {}
  ;

flip_to_coffee
  :
    START_COFFEE coffee_zone END_COFFEE  { $$ = ["COFFEE_ZONE", $2]; }
  ;

coffee_zone 
  :
    coffee_code                              { $$ = [$1]; }
  |
    coffee_code flip_to_toffee coffee_zone     { $$ = $3; $3.splice(0,0,$1,$2); }
  |
    flip_to_toffee coffee_zone                 { $$ = $2; $2.splice(0,0,$1); }
  |
                                             { $$ = []; }
  ;

flip_to_toffee
  :
    START_TOFFEE toffee_zone END_TOFFEE            { $$ = ["TOFFEE_ZONE", $2]; }
  |
    START_INDENTED_TOFFEE toffee_zone END_TOFFEE   { $$ = ["INDENTED_TOFFEE_ZONE", $2]; }
  ;


toffee_code
  :
  code                  { $$ = ["TOFFEE", $1]; }
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
