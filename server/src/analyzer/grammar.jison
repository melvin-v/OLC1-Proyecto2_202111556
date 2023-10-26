%{
    // Importations
    import {Type, ArithmeticOperator, relationalOperator} from './tools/Type.js';
    import {Declare} from './instrucciones/Declare.js';
    import {Set} from './instrucciones/Set.js';
    import {Aritmetica} from './expresiones/Aritmetica.js';
    import {Relacional} from './expresiones/Relacional.js';
    import {Primitivo} from './expresiones/Primitivo.js';
    import {Identificador} from './expresiones/Identificador.js';
    import {Declaraciones} from './instrucciones/Declaraciones.js';
    import {DeclareNull} from './instrucciones/DeclareNull.js';
%}

//Innit Lexical Analysis
%lex
%options case-insensitive

bool "true"| "false"

%%
\s+                   /* skip whitespace */
"--".*                // comment a line
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comment multiple lines  

(\d{4})"-"(\d{1,2})"-"(\d{1,2})     {console.log(yytext); return 'TK_VALUE_DATE';}
(\"(\\.|[^\\"])*\")             {yytext = yytext.substr(1, yyleng-2); return 'TK_VALUE_VARCHAR';}
{bool}                          return 'TK_VALUE_BOOLEAN'
([0-9]+)"."([0-9]+)             return 'TK_VALUE_DOUBLE';
[0-9]+                          return 'TK_VALUE_INT';


"*"                     return '*'
"/"                     return '/'
";"                     return ';'
":"                     return ':'
"."                     return '.'
","                     return ','
"--"                    return '--'
"-"                     return '-'
"++"                    return '++'
"+"                     return '+'
"%"                     return '%'
"^"                     return '^'
"@"                     return '@'

"="                     return '='

"("                     return '('
")"                     return ')' 

// Palabras reservadas
"int"                   return "INT"
"double"                return "DOUBLE"
"boolean"               return "BOOLEAN"
"varchar"               return "VARCHAR"
"date"                  return "DATE"

"declare"               return "DECLARE"
"default"               return "DEFAULT"
"set"                   return "SET"
"print"                 return 'PRINT'
"begin"                 return 'BEGIN'
"end"                   return 'END'
"create"                return 'CREATE'
"table"                 return 'TABLE'
"function"              return 'FUNCTION'
"returns"               return 'RETURNS'
"select"                return 'SELECT'
"lower"                 return 'LOWER'
"upper"                 return 'UPPER'
"round"                 return 'ROUND'


([a-zA-Z_])[a-zA-Z0-9_ñÑ]*                    return 'TK_IDENTIFIER';


<<EOF>>                     return 'EOF';

.                          {console.log({ line: yylloc.first_line, column: yylloc.first_column+1, type: 'Lexico', message: `Error léxico, caracter '${yytext}' no esperado.`})}

/lex

%left '||'
%left '&&'
%left '^'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/','%'
%left '!'
%left '.'
%left '++' '--'
%left '?' ':'

/*------------------------ Grammar Definition ------------------------*/

%start ini

%%

ini : instructions EOF                                              { return $1; }
;

instructions : instructions instruction                             { $1.push($2); $$ = $1; }
        | instruction                                          { $$ = $1 === null ? [] : [$1]; }
;

instruction : 'DECLARE' declaraciones ';'                             { $$ = new Declaraciones($2, @1.first_line, @1.first_column); }
    | set ';'                                              { $$ = $1; }
    | create_table
    | error                                    {  console.log({ line: this._$.first_line, column: this._$.first_column, type: 'Sintáctico', message: `Error sintáctico, token no esperado '${yytext}' .`}) }
;

// ----------Declaración y asignación de variables----------
declaraciones : declaraciones ',' declaracion { $1.push($3); $$ = $1; }
    | declaracion { $$ = [$1]; }
;
declaracion:  '@' TK_IDENTIFIER tipodato { $$ = new DeclareNull($2, $3, @1.first_line, @1.first_column); }
    | '@' TK_IDENTIFIER tipodato 'DEFAULT'expression { $$ =  new Declare($2, $3, $5, @1.first_line, @1.first_column); }
;

// ------------------   SET   -----------------------
set : 'SET' '@' TK_IDENTIFIER '=' expression { $$ = new Set($3, $5); }
;

//DDL
create_table: 'CREATE' 'TABLE' TK_IDENTIFIER '(' columns ')' ';' { $$ = new CreateTable($3, $5, @1.first_line, @1.first_column); }
;
columns: columns ',' column { $1.push($3); $$ = $1; }
    | column { $$ = [$1]; }
;
column: TK_IDENTIFIER tipodato { $$ = new Column($1, $2, @1.first_line, @1.first_column); }

// ------------------   EXPRESIONES   -----------------------
expression :     expression '+' expression                              { $$ = new Aritmetica($1, $3, ArithmeticOperator.PLUS, @1.first_line, @1.first_column); }
               | expression '-' expression                         { $$ = new Aritmetica($1, $3, ArithmeticOperator.MINUS, @1.first_line, @1.first_column); }
               | expression '*' expression                          { $$ = new Aritmetica($1, $3, ArithmeticOperator.MULT, @1.first_line, @1.first_column); }
               | expression '/' expression                           { $$ = new Aritmetica($1, $3, ArithmeticOperator.DIV, @1.first_line, @1.first_column); }
               | expression '==' expression                            { $$ = new Relacional($1, $3, relationalOperator.IGUAL, @1.first_line, @1.first_column); }
               | expression '!=' expression                           { $$ = new Relacional($1, $3, relationalOperator.DIF, @1.first_line, @1.first_column); }
               | expression '<=' expression                           { $$ = new Relacional($1, $3, relationalOperator.MENORIGUAL, @1.first_line, @1.first_column); }
               | expression '>=' expression                           { $$ = new Relacional($1, $3, relationalOperator.MAYORIGUAL, @1.first_line, @1.first_column); }
               | expression '<' expression                            { $$ = new Relacional($1, $3, relationalOperator.MENOR, @1.first_line, @1.first_column); }
               | expression '>' expression                            { $$ = new Relacional($1, $3, relationalOperator.MAYOR, @1.first_line, @1.first_column); }
               | '-' exp                                                { $$ = new Primitivo($2, Type.NEGATIVE, @1.first_line, @1.first_column); }
               | exp                                                      { $$ = $1; }
;

exp :   TK_IDENTIFIER { $$ = new Identificador($1, @1.first_line, @1.first_column); }
    | TK_VALUE_VARCHAR { $$ = new Primitivo($1, Type.VARCHAR, @1.first_line, @1.first_column); }
    | TK_VALUE_INT { $$ = new Primitivo($1, Type.INT, @1.first_line, @1.first_column); }
    | TK_VALUE_BOOLEAN { $$ = new Primitivo($1, Type.BOOLEAN, @1.first_line, @1.first_column); }
    | TK_VALUE_DOUBLE { $$ = new Primitivo($1, Type.DOUBLE, @1.first_line, @1.first_column); }
    | TK_VALUE_DATE { $$ = new Primitivo($1, Type.DATE, @1.first_line, @1.first_column); }
    | TK_VALUE_NULL { $$ = new Primitivo($1, Type.NULL, @1.first_line, @1.first_column); }
;

tipodato : 'INT'     { $$ = Type.INT; }
        | 'DOUBLE'  { $$ = Type.DOUBLE; }
        | 'VARCHAR' { $$ = Type.VARCHAR; }
        | 'BOOLEAN' { $$ = Type.BOOLEAN; }
        | 'DATE'    { $$ = Type.DATE; }
;