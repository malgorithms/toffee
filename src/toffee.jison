//
//
// grammar file for Toffee Templating
//
//

%lex
%%

"{##"                     return 'START_TOFFEE_COMMENT';
"##}"                     return 'END_TOFFEE_COMMENT';
":}"                      return 'END_TOFFEE';
"{:"                      return 'START_TOFFEE';
"{#"                      return 'START_COFFEE';
"#}"                      return 'END_COFFEE';
[^{}#\\:\-]+|[\\{}#:\-]   return 'CODE';
<<EOF>>                   return 'EOF';

/lex

%start starter

%%

starter 
  :
    toffee_zone EOF                                 { $$ = ["TOFFEE_ZONE", $1]; return $$;}
  ;


toffee_zone 
  :
    toffee_code                                      { $$ = [$1]; }
  |
    toffee_code flip_to_coffee toffee_zone           { $$ = $3; $3.splice(0,0,$1,$2); }
  |
    flip_to_coffee toffee_zone                       { $$ = $2; $2.splice(0,0,$1); }
  |
    toffee_code flip_to_toffee_comment toffee_zone   { $$ = $3; $3.splice(0,0,$1); }
  |
    flip_to_toffee_comment toffee_zone               { $$ = $2;  }
  |
                                                     { $$ = []; }
  ;

flip_to_toffee_comment
  :
  START_TOFFEE_COMMENT toffee_commented_region END_TOFFEE_COMMENT  {}
  ;

toffee_commented_region
  : 
    toffee_commented_region START_COFFEE 
  |
    toffee_commented_region END_COFFEE 
  | 
    toffee_commented_region START_TOFFEE 
  |
    toffee_commented_region END_TOFFEE 
  |
    toffee_commented_region CODE 
  |
  ;

flip_to_coffee
  :
    START_COFFEE coffee_zone END_COFFEE         { $$ = ["COFFEE_ZONE", $2]; }
  ;

coffee_zone 
  :
    coffee_code                                 { $$ = [$1]; }
  |
    coffee_code flip_to_toffee coffee_zone      { $$ = $3; $3.splice(0,0,$1,$2); }
  |
    flip_to_toffee coffee_zone                  { $$ = $2; $2.splice(0,0,$1); }
  |
                                                { $$ = []; }
  ;

flip_to_toffee
  :
    START_TOFFEE toffee_zone END_TOFFEE            { $$ = ["TOFFEE_ZONE", $2]; }
  ;


toffee_code
  :
  code                  { $$ = ["TOFFEE", $1[0], $1[1] ]; }
  ;

coffee_code
  :
  code                  { $$ = ["COFFEE", $1[0], $1[1] ]; }
  ;


code
  :
    CODE                                 { var ln = yylineno + 1 - $1.split("\n").length + 1; 
                                           $$ = [$1, ln]; 
                                         }
  |
    code CODE                            { var c = $1[0] + $2; 
                                           var ln = yylineno + 1 - c.split("\n").length + 1; 
                                           $$ = [c, ln]; 
                                         }
  ;
