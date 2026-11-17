from aiogram import F, types
from aiogram.types import InlineKeyboardButton

import bot_extra
from main import dp

# eski «Test tahlil» ishlovchisini olib tashlaymiz
dp.callback_query.handlers = [
    h for h in dp.callback_query.handlers
    if getattr(h.callback, "__name__", "") != "cb_tahlil"]

TEXT = (
    "📈 Test tahlil\n\n"
    "📢 Rasmiy kanalimizga qo'shiling!\n\n"
    "U yerda sizni kutmoqda:\n"
    "✅ Har bir testning batafsil tahlili\n"
    "✅ Qiyin savollarning yechimlari\n"
    "✅ MS imtihoniga foydali materiallar va maslahatlar\n"
    "✅ Yangi testlar e'lonlari va yangiliklar\n\n"
    "Bilimingizni birgalikda oshiramiz! 🚀")


@dp.callback_query(F.data == "tahlil")
async def cb_tahlil_new(c: types.CallbackQuery):
    rows = []
    url = getattr(bot_extra, "CHANNEL_URL", "")
    if url:
        rows.append([InlineKeyboardButton(
            text="📢 Kanalga o'tish", url=url)])
    await c.message.answer(TEXT, reply_markup=bot_extra.back_kb(*rows))
    await c.answer()
  
