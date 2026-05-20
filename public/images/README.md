# 画卷图存放位置

把下载好的《清明上河图》图片**重命名为 `qingming-full.jpg`** 放在本目录下:

```
public/images/qingming-full.jpg
```

## 推荐图源

1. **故宫博物院数字文物库**(故宫藏《清明上河图》宋本)
   <https://digicol.dpm.org.cn/>
   搜「清明上河图」,下载最大尺寸

2. **Wikimedia Commons**(公有领域,直接可用)
   <https://commons.wikimedia.org/wiki/File:Along_the_River_During_the_Qingming_Festival_(Qing_Court_Version).jpg>
   或宋张择端原本:
   <https://commons.wikimedia.org/wiki/File:Along_the_River_7-1.jpg>

## 注意事项

- **尺寸建议**:横向像素 ≥ 6000px(原画长 528 cm,高清扫描可达 20000px+)
- **格式**:`.jpg` 或改名后用 `.png`/`.webp`(若改格式,记得改 `src/components/Scroll.tsx` 里的 `SCROLL_IMAGE` 路径)
- **文件大小**:5–30 MB 比较合适,太大会拖慢加载
- 如果嫌慢,可用在线工具压缩(<https://tinypng.com/>)
