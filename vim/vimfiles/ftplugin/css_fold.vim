" fold javascript function code.
" need ftpplugin/python_fold.vim
" @see http://amix.dk/blog/viewEntry/19132
" @see http://vim.sourceforge.net/scripts/script.php?script_id=515
" @see http://amix.dk/vim/vimrc.html
function! CSSFold()
    setl foldmethod=syntax
"    setl foldlevelstart=1
    syn region foldBraces start=/{/ end=/}/ transparent fold keepend extend

    function! FoldText()
        return substitute(getline(v:foldstart), '{.*', '{...}', '')
    endfunction
    setl foldtext=FoldText()
endfunction
au FileType css call CSSFold()
au FileType css setl fen
