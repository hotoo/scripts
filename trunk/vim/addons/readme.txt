wget.exe
http://users.ugent.be/~bpuype/wget/
问题描述：
    gvim可以使用菜单的打开命令和工具栏功能按钮打开远程/网络文件，但是用 
        :vi http://www.vim.org/
        :e http://www.vim.org/
        :sp http://www.vim.org/
        :tabnew http://www.vim.org/
    等命令却不可以，说是wget不可用。

解决方法：
    将 wget.exe 放到系统Path（如  c:\windows）下，即可。
