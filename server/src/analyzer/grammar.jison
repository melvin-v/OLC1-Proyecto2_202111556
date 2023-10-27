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
    import {CreateTable} from './instrucciones/CreateTable.js';
    import {Columna} from './instrucciones/Columna.js';
    import {AlterTable} from './instrucciones/AlterTable.js';
    import {AddColumn} from './instrucciones/AddColumn.js';
    import {DropColumn} from './instrucciones/DropColumn.js';
    import {RenameTable} from './instrucciones/RenameTable.js';
    import {RenameColumn} from './instrucciones/RenameColumn.js';
    import {DropTable} from './instrucciones/DropTable.js';
    import {Insert} from './instrucciones/Insert.js';
    import {Select} from './instrucciones/Select.js';
    import {SelectAll} from './instrucciones/SelectAll.js';
    import { Data } from "./data/Data";

    // Global Variables
    const data = Data.getInstance();
%}

//Innit Lexical Analysis
%lex
%options case-insensitive

bool "true"| "false"

%%
\s+                   /* skip whitespace */
"--".*                // comment a line
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comment multiple lines  

(\d{4})"-"(\d{1,2})"-"(\d{1,2})     {data.tokens.push({Tipo: 'TK_VALUE_DATE', Valor: yytext});; return 'TK_VALUE_DATE';}
(\"(\\.|[^\\"])*\")             {yytext = yytext.substr(1, yyleng-2); return 'TK_VALUE_VARCHAR';}
{bool}                          {data.tokens.push({Tipo: 'TK_VALUE_BOOLEAN', Valor: yytext}); return 'TK_VALUE_BOOLEAN'}
([0-9]+)"."([0-9]+)             {data.tokens.push({Tipo: 'TK_VALUE_DOUBLE', Valor: yytext}); return 'TK_VALUE_DOUBLE';}
[0-9]+                          {data.tokens.push({Tipo: 'TK_VALUE_INT', Valor: yytext}); return 'TK_VALUE_INT';}


"*"                     {data.tokens.push({Tipo: 'ASTERISCO', Valor: yytext});return '*';}
"/"                     {data.tokens.push({Tipo: 'SLASH', Valor: yytext});return '/';}
";"                     {data.tokens.push({Tipo: 'PUNTO_COMA', Valor: yytext});return ';';}
":"                     {data.tokens.push({Tipo: 'DOS_PUNTOS', Valor: yytext});return ':';}
"."                     {data.tokens.push({Tipo: 'PUNTO', Valor: yytext});return '.';}
","                     {data.tokens.push({Tipo: 'COMA', Valor: yytext});return ',';}
"--"                    {data.tokens.push({Tipo: 'GUION_GUION', Valor: yytext});return '--';}
"-"                     {data.tokens.push({Tipo: 'GUION', Valor: yytext});return '-';}
"+"                     {data.tokens.push({Tipo: 'MAS', Valor: yytext});return '+';}
"%"                     {data.tokens.push({Tipo: 'PORCENTAJE', Valor: yytext});return '%';}
"^"                     {data.tokens.push({Tipo: 'ELEVADO', Valor: yytext});return '^';}
"@"                     {data.tokens.push({Tipo: 'ARROBA', Valor: yytext});return '@';}

"="                     {data.tokens.push({Tipo: 'IGUAL', Valor: yytext});return '=';}

"("                     {data.tokens.push({Tipo: 'PARENTESIS_IZQ', Valor: yytext});return '(';}
")"                     {data.tokens.push({Tipo: 'PARENTESIS_DER', Valor: yytext});return ')';} 

// Palabras reservadas
"int"                   {data.tokens.push({Tipo: 'RESERVADA INT', Valor: yytext});return 'INT';}
"double"                {data.tokens.push({Tipo: 'RESERVADA DOUBLE', Valor: yytext});return 'DOUBLE';}
"boolean"               {data.tokens.push({Tipo: 'RESERVADA BOOLEAN', Valor: yytext});return 'BOOLEAN';}
"varchar"               {data.tokens.push({Tipo: 'RESERVADA VARCHAR', Valor: yytext});return 'VARCHAR';}
"date"                  {data.tokens.push({Tipo: 'RESERVADA DATE', Valor: yytext});return 'DATE';}

"declare"               {data.tokens.push({Tipo: 'RESERVADA dECLARE', Valor: yytext});return 'DECLARE';}
"default"               {data.tokens.push({Tipo: 'RESERVADA DEFAULT', Valor: yytext});return 'DEFAULT';}
"set"                   {data.tokens.push({Tipo: 'RESERVADA SET', Valor: yytext});return 'SET';}
"alter"                 {data.tokens.push({Tipo: 'RESERVADA ALTER', Valor: yytext});return 'ALTER';}
"add"                   {data.tokens.push({Tipo: 'RESERVADA ADD', Valor: yytext});return 'ADD';}
"drop"                  {data.tokens.push({Tipo: 'RESERVADA DROP', Valor: yytext});return 'DROP';}
"rename"                {data.tokens.push({Tipo: 'RESERVADA RENAME', Valor: yytext});return 'RENAME';}
"to"                    {data.tokens.push({Tipo: 'RESERVADA TO', Valor: yytext});return 'TO';}
"print"                 {data.tokens.push({Tipo: 'RESERVADA PRINT', Valor: yytext});return 'PRINT';}
"begin"                 {data.tokens.push({Tipo: 'RESERVADA BEGIN', Valor: yytext});return 'BEGIN';}
"end"                   {data.tokens.push({Tipo: 'RESERVADA END', Valor: yytext});return 'END';}
"create"                {data.tokens.push({Tipo: 'RESERVADA CREATE', Valor: yytext});return 'CREATE';}
"table"                 {data.tokens.push({Tipo: 'RESERVADA TABLE', Valor: yytext});return 'TABLE';}
"function"              {data.tokens.push({Tipo: 'RESERVADA FUNCTION', Valor: yytext});return 'FUNCTION';}
"returns"               {data.tokens.push({Tipo: 'RESERVADA RETURNS', Valor: yytext});return 'RETURNS';}
"select"                {data.tokens.push({Tipo: 'RESERVADA SELECT', Valor: yytext});return 'SELECT';}
"lower"                 {data.tokens.push({Tipo: 'RESERVADA LOWER', Valor: yytext});return 'LOWER';}
"upper"                 {data.tokens.push({Tipo: 'RESERVADA UPPER', Valor: yytext});return 'UPPER';}
"round"                 {data.tokens.push({Tipo: 'RESERVADA ROUND', Valor: yytext});return 'ROUND';}
"insert"                {data.tokens.push({Tipo: 'RESERVADA INSERT', Valor: yytext});return 'INSERT';}
"into"                  {data.tokens.push({Tipo: 'RESERVADA INTO', Valor: yytext});return 'INTO';}   
"values"                {data.tokens.push({Tipo: 'RESERVADA VALUES', Valor: yytext});return 'VALUES';}
"from"                  {data.tokens.push({Tipo: 'RESERVADA FROM', Valor: yytext});return 'FROM';}


([a-zA-Z_])[a-zA-Z0-9_ñÑ]*                    {data.tokens.push({Tipo: 'TK_IDENTIFIER', Valor: yytext});return 'TK_IDENTIFIER';}


<<EOF>>                     return 'EOF';

.                          {
    data.errores.push({ line: yylloc.first_line, column: yylloc.first_column+1, type: 'Lexico', message: `Error léxico, caracter '${yytext}' no esperado.`});
    console.log({ line: yylloc.first_line, column: yylloc.first_column+1, type: 'Lexico', message: `Error léxico, caracter '${yytext}' no esperado.`});
        }

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
    | create_table ';'                                              { $$ = $1; }
    | alter_table ';'                                              { $$ = $1; }
    | drop ';'                                              { $$ = $1; }
    | insert ';'                                              { $$ = $1; }
    | select ';'                                              { $$ = $1; }
    | error                                    {
          data.errores.push({ line: this._$.first_line, column: this._$.first_column, type: 'Sintáctico', message: `Error sintáctico, token no esperado '${yytext}' .`});
          console.log({ line: this._$.first_line, column: this._$.first_column, type: 'Sintáctico', message: `Error sintáctico, token no esperado '${yytext}' .`}); 
          }
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
create_table: 'CREATE' 'TABLE' TK_IDENTIFIER '(' columns ')'  { $$ = new CreateTable($3, $5, @1.first_line, @1.first_column);}
;
columns: columns ',' column { $1.push($3); $$ = $1; }
    | column { $$ = [$1]; }
;
column: TK_IDENTIFIER tipodato { $$ = new Columna($1, $2, @1.first_line, @1.first_column); }
;

alter_table: 'ALTER' 'TABLE' TK_IDENTIFIER accion_alter { $$ = new AlterTable($3, $4, @1.first_line, @1.first_column); }
;
accion_alter: 'ADD' TK_IDENTIFIER tipodato { $$ = new AddColumn($2, $3, @1.first_line, @1.first_column);}
    | 'DROP' 'COLUMN' TK_IDENTIFIER { $$ = new DropColumn($3, @1.first_line, @1.first_column); }
    | 'RENAME''TO' TK_IDENTIFIER { $$ = new RenameTable($3, @1.first_line, @1.first_column); }
    | 'RENAME' 'COLUMN' TK_IDENTIFIER 'TO' TK_IDENTIFIER { $$ = new RenameColumn($3, $5, @1.first_line, @1.first_column); }
;

drop : 'DROP' 'TABLE' TK_IDENTIFIER { $$ = new  DropTable($3, @1.first_line, @1.first_column); } 
;
//DML
insert : 'INSERT' 'INTO' TK_IDENTIFIER '(' cabeceras ')' 'VALUES' '(' valores ')' { $$ = new Insert($3, $5, $9, @1.first_line, @1.first_column); }
;
cabeceras : cabeceras ',' TK_IDENTIFIER { $1.push($3); $$ = $1; }
    | TK_IDENTIFIER { $$ = [$1]; }
    ;
valores : valores ',' expression { $1.push($3); $$ = $1; }
    | expression { $$ = [$1]; }
    ;
select : 'SELECT' seleciones 'FROM' TK_IDENTIFIER { $$ = new Select($2, $4, @1.first_line, @1.first_column); }
       | 'SELECT' '*' 'FROM' TK_IDENTIFIER { $$ = new SelectAll($4, @1.first_line, @1.first_column); }
;
seleciones : seleciones ',' TK_IDENTIFIER { $1.push($3); $$ = $1; }
    | TK_IDENTIFIER { $$ = [$1]; }
    ;
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