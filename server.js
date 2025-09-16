const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// إعداد CORS للسماح بالوصول من جميع المصادر
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// خدمة الملفات الثابتة من مجلد attached_assets
app.use('/assets', express.static(path.join(__dirname, 'attached_assets')));

// تقديم ملف HTML كصفحة رئيسية
app.get('/', (req, res) => {
    try {
        const htmlPath = path.join(__dirname, 'attached_assets', 'index_1758018912449.html');
        
        // التحقق من وجود الملف
        if (fs.existsSync(htmlPath)) {
            res.sendFile(htmlPath);
        } else {
            res.status(404).send(`
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>خطأ 404</title>
                    <style>
                        body {
                            font-family: 'Cairo', 'Segoe UI', sans-serif;
                            background: #1a1d29;
                            color: #ffffff;
                            text-align: center;
                            padding: 50px;
                        }
                        .error-container {
                            max-width: 600px;
                            margin: 0 auto;
                            background: #2d3142;
                            padding: 40px;
                            border-radius: 15px;
                            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                        }
                        h1 { color: #ff6b6b; margin-bottom: 20px; }
                        p { margin-bottom: 15px; line-height: 1.6; }
                    </style>
                </head>
                <body>
                    <div class="error-container">
                        <h1>⚠️ ملف HTML غير موجود</h1>
                        <p>لم يتم العثور على ملف index_1758018912449.html في مجلد attached_assets</p>
                        <p>يرجى التأكد من وجود الملف في المسار الصحيح</p>
                    </div>
                </body>
                </html>
            `);
        }
    } catch (error) {
        console.error('خطأ في تحميل الملف:', error);
        res.status(500).send(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>خطأ خادم</title>
                <style>
                    body {
                        font-family: 'Cairo', 'Segoe UI', sans-serif;
                        background: #1a1d29;
                        color: #ffffff;
                        text-align: center;
                        padding: 50px;
                    }
                    .error-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: #2d3142;
                        padding: 40px;
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    }
                    h1 { color: #ff6b6b; margin-bottom: 20px; }
                    p { margin-bottom: 15px; line-height: 1.6; }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <h1>⚠️ خطأ في الخادم</h1>
                    <p>حدث خطأ أثناء تحميل الصفحة</p>
                    <p>يرجى المحاولة مرة أخرى لاحقاً</p>
                </div>
            </body>
            </html>
        `);
    }
});

// معالجة جميع المسارات الأخرى
app.get('*', (req, res) => {
    res.redirect('/');
});

// بدء تشغيل الخادم
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 خادم دوري الفانتازي المدرسي يعمل على المنفذ ${PORT}`);
    console.log(`🌐 الرابط المحلي: http://localhost:${PORT}`);
    console.log(`📁 مجلد الملفات: ${path.join(__dirname, 'attached_assets')}`);
});

// معالجة إغلاق الخادم بطريقة صحيحة
process.on('SIGTERM', () => {
    console.log('🛑 إيقاف الخادم...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 إيقاف الخادم...');
    process.exit(0);
});