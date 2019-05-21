/************************************************************************************************************
 * Author		:谭清亮
 * Date			:2018-11-02
 * Description	:新验证码相关的逻辑类方法
************************************************************************************************************/

using System;
using System.IO;
using Common;
using System.DrawingCore;
using System.DrawingCore.Imaging;

namespace Soholife.Common
{
    /// <summary>
    ///TValidatePic 的摘要说明
    /// </summary>
    public class ValidatePic
    {
        /// <summary>
        /// 随机数的种子
        /// </summary>
        private static Random rInt = new Random(unchecked((int)DateTime.Now.Ticks));

        /// <summary>
        /// 加密的校验码
        /// </summary>
        private const string _encryptkey = "!@#$%^%&ER^&()^TWUH&W#%";            //密钥

        /// <summary>
        /// 当使用SESSION存储验证码的时候，SESSION的名称
        /// </summary>
        private const string VALIDATE_SESSION_NAME = "ValidatePic";

        #region 创建图片
        /// <summary>
        /// 输出图片对象
        /// </summary>		
        public static MemoryStream CreateImage(out string sCode)
        {
            return CreateImage(4, "en", out sCode);
        }

        /// <summary>
        /// 输出图片对象
        /// </summary>		
        public static MemoryStream CreateImage(int iLen, out string sCode)
        {
            return CreateImage(iLen, "en", out sCode);
        }


        /// <summary>
        /// 输出图片对象
        /// </summary>		
        public static MemoryStream CreateImage(int iLen, string sType, out string sCode)
        {
            string checkCode = "";
            if (sType.ToLower() == "cn")
            {
                iLen = iLen / 2 + 1;
                checkCode = rndStr_CN(iLen);
            }
            else
            {
                checkCode = rndStr(iLen);
            }
            sCode = Encrypt(checkCode.ToLower());
            //开始产生对应的图片
            return CreateImage(checkCode);
        }

        /// <summary>
        /// 输出图片对象
        /// </summary>
        public static MemoryStream CreateImage(string chkCode)
        {
            int iHeight = 60;
            int iWidth = chkCode.Length * 51;

            Random rnd = new Random();
            Color[] color = new Color[] { Color.Black, Color.Red, Color.Blue, Color.Brown, Color.Brown, Color.DarkBlue };

            //字体列表，用于验证码
            string[] font = new string[] { "Book Antiqua", "PMingLiU", "blod" };



            Bitmap bmp = new Bitmap(iWidth, iHeight);
            Graphics g = Graphics.FromImage(bmp);
            g.Clear(Color.White);

            //画噪线
            for (int i = 0; i < 10; i++)
            {
                int x1 = rnd.Next(iWidth);
                int y1 = rnd.Next(iHeight);
                int x2 = rnd.Next(iWidth);
                int y2 = rnd.Next(iHeight);
                Color clr = color[rnd.Next(color.Length)];
                g.DrawLine(new Pen(clr), x1, y1, x2, y2);
            }

            //画验证码字符串
            for (int i = 0; i < chkCode.Length; i++)
            {
                string fnt = font[rnd.Next(font.Length)];
                Font ft = new Font(fnt, 30);
                Color clr = color[rnd.Next(color.Length)];
                //g.DrawString(chkCode[i].ToString(), ft, new SolidBrush(clr), (float)i * 40 + 16, (float)16 - 8);
                g.DrawString(chkCode[i].ToString(), ft, new SolidBrush(clr), (float)i * RndUtils.GetRndNumber(35, 45) + RndUtils.GetRndNumber(8, 16), (float)16 - 8);
            }

            //画噪点
            for (int i = 0; i < 50; i++)
            {
                int x = rnd.Next(bmp.Width);
                int y = rnd.Next(bmp.Height);
                Color clr = color[rnd.Next(color.Length)];
                bmp.SetPixel(x, y, clr);
            }

            #region Add By Soholife ,2011-09-20
            bmp = TwistImage(bmp, true, 2.5, 1);
            bmp = TwistImage(bmp, false, 5, 3);
            #endregion


            //将验证码图片写入内存流，并将其以 "image/Png" 格式输出
            MemoryStream ms = new MemoryStream();
            try
            {
                bmp.Save(ms, ImageFormat.Png);
            }
            finally
            {
                //显式释放资源
                bmp.Dispose();
                g.Dispose();
            }
            return ms;
        }

        #endregion



        #region 得到随机验证字符串
        /// <summary>
        /// 生成随机长度的图片验证字符串
        /// </summary>
        /// <param name="iLen"></param>
        /// <returns></returns>
        private static String rndStr(int iLen)
        {
            String sTemp = "";
            String sForRnd = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,P,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9";

            String[] aRnd = sForRnd.Split(',');

            int iArLen = aRnd.Length;

            for (Int32 i = 0; i < iLen; i++)
            {
                sTemp += aRnd[RndUtils.GetRndNumber(iArLen)];
            }
            return sTemp;
        }

        /// <summary>
        /// 生成随机长度的图片验证字符串
        /// </summary>
        /// <param name="iLen"></param>
        /// <returns></returns>
        private static String rndStr_CN(int iLen)
        {
            String sTemp = "";
            iLen = iLen / 2;

            String sForRnd = "做事,座位,作者,作息,组装,组词,组成,阻挠,足球,足够,租房,走失,总要,总是,自然,自觉,仔细,桌布,状元,状态,装修,专心,专门,助手,煮饭,竹竿,猪肉,种植,种田,种花,种地,钟点,终年,终点,中肯,治水,制作,制造,指甲,指出,纸片,纸盒,植物,植树,植被,直立,织网,织布,知晓,知觉,枝叶,枝头,证书,证明,挣开,争取,争光,真丝,珍珠,珍贵,珍宝,珍爱,这些,找到,招手,招收,招呼,章节,造林,造句,造船,造成,早稻,早晨,再说,再见,再次,运用,运动,云朵,云层,云彩,愿意,愿望,原因,原先,原来,园长,雨披,雨季,渔民,渔夫,渔村,渔船,渔场,鱼网,鱼丸,有些,友善,友情,游泳,游兴,邮寄,用力,用劲,用功,用处,泳衣,永久,英才,应有,应该,应当,因为,因果,因而,义气,以为,以前,医生,衣服,衣袋,叶片,也许,要求,摇头,摇手,摇摆,羊群,羊角,秧苗,眼神,眼看,眼睛,眼光,沿途,沿路,沿海,岩石,岩洞,岩壁,牙齿,学者,学习,学科,许愿,许诺,许久,许多,须知,幸运,幸会,幸好,幸福,形状,形容,兴趣,信息,新处,害怕,害虫,滚动,贵重,贵客,光临,光彩,观看,观光,观察,关闭,瓜果,鼓掌,古诗,古代,够用,功力,功劳,公园,跟头,跟前,跟从,各自,高兴,高烧,高坡,高处,刚好,刚才,赶路,赶快,赶紧,盖章,该当,富足,富裕,富有,富饶,富豪,负责,负担,浮力,浮动,服装,服药,服务,丰收,丰盛,丰饶,丰富,分组,分晓,分享,分布,放牧,纺织,房客,房间,方形,饭盒,反面,反而,反对,翻身,发展,发芽,发现,发怒,发明,发亮,发奖,发光,耳机,耳光,耳朵,而是,而且,儿童,鹅绒,朵朵,对岸,断开,豆芽,豆沙,豆苗,豆浆,斗笠,都市,冬眠,冬瓜,丢失,定点,顶替,叼走,叼去,店面,店长,电脑,电波,点头,点滴,底下,底细,滴答,得意,得奖,得到,稻田,稻谷,稻草,道路,道理,道出,到底,到处,倒翻,倒车,挡路,挡风,挡车,淡绿,淡出,但愿,但是,打折,打鼓,打断,打扮,答应,错误,错觉,错过,丛书,丛林,聪明,聪慧,从容,从前,从来,词语,春晓,春眠,吹号,床铺,窗门,窗花,窗户,船夫,船舱,川菜,除夕,除草,出现,出息,出勤,出借,抽烟,抽丝,抽水,抽纱,冲洗,迟早,迟缓,迟到,池鱼,池塘,池水,吃饭,城乡,城市,城墙,晨星,晨曲,晨光,陈述,陈皮,陈旧,车床,潮水,潮湿,潮流,朝阳,朝北,常规,常常,长椅,长处,差别,草原,草坪,草根,草丛,舱位,彩色,彩排,彩电,采莲,采矿,采集,采光,采茶,才能,步行,步伐,布景,布店,不久,不但,不错,播种,波动,冰水,冰山,冰块,表现,表叔,变换,碧绿,碧空,碧波,闭眼,必要,必须,必定,被动,被单,背带,背包,备用,备课,保重,保护,宝玉,宝贵,包书,包括,帮助,帮手,帮忙,扮戏,半夜,摆动,安闲,安静,新鲜,新年,新旧,新春,心愿,心情,斜阳,斜坡,笑脸,校服,消息,消失,消除,像话,象牙,象棋,想必,响应,响声,响亮,享受,享乐,享福,相信,相似,相识,相关,相反,相差,现在,咸淡,闲话,鲜美,鲜花,鲜红,先生,先进,先后,吓唬,细心,细小,细密,喜欢,喜爱,洗衣,洗手,习作,习惯,希望,希奇,希罕,西瓜,误解,误会,舞者,舞蹈,午睡,无情,问题,文章,文静,位置,位居,望风,网球,网络,完善,完全,完美,完成,外孙,蛙泳,退缩,退回,退步,推开,推动,推迟,推车,团聚,团队,图纸,图章,图形,图片,图画,头巾,头顶,童年,通道,通车,挺身,挺立,听讲,跳远,跳舞,跳绳,跳高,挑选,挑水,挑食,挑夫,挑担,甜食,甜美,天使,天然,天鹅,题型,提要,提醒,提问,提水,提高,提纲,啼哭,啼叫,唐装,谈心,谈话,所有,所以,缩小,松紧,似的,死海,丝瓜,丝带,睡眠,睡觉,水牛,水泥,水稻,水波,霜露,霜冻,双手,双杠,双方,树枝,树苗,树根,树洞,舒心,舒适,舒缓,舒服,舒畅,书桌,书亭,书房,书店,书包,首尾,手指,手巾,手表,收信,收缩,收获,收发,收到,事先,事情,使用,使劲,食指,食油,食用,食堂,时装,时钟,时刻,时间,时常,石像,诗集,失去,生命,升级,神偷,神气,神话,深浅,伸直,伸手,伸出,烧水,烧鸡,上升,商店,山岩,山泉,山坡,山洞,山顶,纱巾,纱布,扫雪,扫兴,扫地,散会,散步,散布,如何,肉皮,肉饼,热情,热闹,热爱,让座,然后,然而,泉眼,泉水,曲折,求医,求学,请坐,请求,请客,请进,请教,清醒,清洗,清泉,清楚,清晨,倾斜,轻松,轻声,勤学,勤劳,勤快,亲密,巧手,墙角,强弱,浅滩,浅水,浅绿,浅灰,浅红,潜水,潜力,前腿,汽运,汽油,汽水,汽笛,汽车,启发,启动,骑术,骑马,骑车,奇妙,期望,期盼,扑灭,扑空,扑打,泼水,泼辣,坡度,坡地,坡道,漂亮,漂泊,漂白,片刻,皮匠,披衣,披肩,盆景,旁边,盼望,盼头,怕事,爬山,爬坡,爬虫,暖和,女孩,弄堂,弄懂,弄错,农民,农忙,农夫,牛皮,牛奶,鸟鸣,年轻,泥丸,泥沙,泥浆,能量,能力,能够,脑袋,挠头,奶粉,奶茶,那样,那里,那就,那边,哪吒,哪些,哪怕,哪里,牧羊,牧童,牧犬,牧区,牧民,木刻,木匠,木床,命题,鸣叫,鸣笛,名次,民乐,民间,民歌,面包,棉衣,棉球,棉花,棉被,棉袄,密封,米粒,门牙,美妙,美化,每天,每年,每回,每次,毛巾,猫眼,慢车,路旁,柳絮,柳条,柳丝,柳树,流水,流利,流动,流传,另外,灵巧,灵活,两旁,练习,练功,脸色,脸谱,脸红,莲心,莲蓬,莲花,连写,连声,连忙,力气,理由,理想,理解,乐观,牢记,牢固,劳累,劳动,兰花,兰草,拉开,拉车,快艇,快慢,块头,夸奖,苦楚,空闲,肯定,课桌,渴望,可怕,颗粒,科室,开启,开饭,开窗,开采,觉醒,觉得,觉察,绝妙,绝句,绝对,句法,举重,举手,举杯,居住,居所,居然,居民,就位,就是,就近,旧居,久远,静心,井沿,井水,精神,精密,精美,精力,晶莹,惊醒,惊吓,经验,经过,经常,近似,劲头,紧张,紧迫,紧急,金鱼,借问,借书,借光,解散,解开,解毒,结束,接受,接近,教书,脚步,浇水,浇树,浇花,浇地,交通,交替,交谈,交流,交换,交代,奖杯,讲课,讲解,讲话,江岸,见习,煎鱼,煎饼,煎熬,甲乙,甲虫,寄养,寄信,寄放,季节,季度,季报,记忆,集市,急忙,吉庆,吉利,机灵,伙食,伙伴,火腿,火热,活泼,回忆,回绝,灰心,灰兔,灰色,黄泥,黄金,黄昏,黄豆,换牙,换洗,环保,坏处,画像,化学,花园,花盆,花脸,花朵,护理,胡须,胡闹,胡话,忽然,洪水,洪亮,河沿,和善,和面,何必,禾苗,喝汤,喝水,喝茶,好像,好胜";
            String[] aRnd = sForRnd.Split(',');

            int iArLen = aRnd.Length;
            for (Int32 i = 0; i < iLen; i++)
            {
                sTemp += aRnd[RndUtils.GetRndNumber(iArLen)];
            }
            return sTemp;
        }
        #endregion

        /// <summary>
        /// 得到验证密文
        /// </summary>
        /// <param name="sCode"></param>
        /// <returns></returns>
        private static string Encrypt(string sCode)
        {
            return SecurityUtils.Encrypt3DES(sCode.Trim().ToLower(), _encryptkey);
        }

        /// <summary>
        /// 得到验证明文
        /// </summary>
        /// <param name="sCode"></param>
        /// <returns></returns>
        private static string Decrypt(string sCode)
        {
            return SecurityUtils.Decrypt3DES(sCode, _encryptkey);
        }

        /// <summary>
        /// 检查输入是否正确
        /// </summary>
        /// <param name="sUserInput"></param>
        /// <param name="sEncryptCode"></param>
        /// <returns></returns>
        public static bool CheckCode(string sUserInput, string sEncryptCode)
        {
            if (sUserInput.ToLower() == Decrypt(sEncryptCode))
                return true;
            else
                return false;
        }

        #region 正弦扭曲
        private const double PI = 3.1415926535897932384626433832795;
        private const double PI2 = 6.283185307179586476925286766559;

        /// <summary>
        /// 正弦曲线Wave扭曲图片
        /// </summary>
        /// <param name="srcBmp"></param>
        /// <param name="bXDir"></param>
        /// <param name="nMultValue">波形的幅度倍数</param>
        /// <param name="dPhase">波形的起始相位，取值区间[0-2*PI)</param>
        /// <returns></returns>
        private static Bitmap TwistImage(Bitmap srcBmp, bool bXDir, double dMultValue, double dPhase)
        {
            Bitmap destBmp = new Bitmap(srcBmp.Width, srcBmp.Height);

            // 将位图背景填充为白色
            Graphics graph = Graphics.FromImage(destBmp);
            graph.FillRectangle(new SolidBrush(Color.White), 0, 0, destBmp.Width, destBmp.Height);
            graph.Dispose();

            double dBaseAxisLen = bXDir ? (double)destBmp.Height : (double)destBmp.Width;

            for (int i = 0; i < destBmp.Width; i++)
            {
                for (int j = 0; j < destBmp.Height; j++)
                {
                    double dx = 0;
                    dx = bXDir ? (PI2 * (double)j) / dBaseAxisLen : (PI2 * (double)i) / dBaseAxisLen;
                    dx += dPhase;
                    double dy = Math.Sin(dx);

                    // 取得当前点的颜色
                    int nOldX = 0, nOldY = 0;
                    nOldX = bXDir ? i + (int)(dy * dMultValue) : i;
                    nOldY = bXDir ? j : j + (int)(dy * dMultValue);

                    Color color = srcBmp.GetPixel(i, j);
                    if (nOldX >= 0 && nOldX < destBmp.Width
                     && nOldY >= 0 && nOldY < destBmp.Height)
                    {
                        destBmp.SetPixel(nOldX, nOldY, color);
                    }
                }
            }

            return destBmp;
        }

        #endregion
    }
}