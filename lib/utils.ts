type Transaction = {
  id: string;
  created_at: string;
  amount: number;
  type: "Income" | "Expense" | "Saving" | "Investment";
};

type GroupedTransactions = Record<
  string,
  {
    transactions: Transaction[];
    amount: number;
  }
>;

export const groupAndSumTransactionsByDate = (
  transactions: Transaction[]
): GroupedTransactions => {
  const grouped: GroupedTransactions = {};

  // İşlem verilerini tek tek döngüye alıyoruz
  for (const transaction of transactions) {
    const createdAt = transaction.created_at;

    // 'created_at' değerinin geçerli olup olmadığını kontrol et
    if (!createdAt || typeof createdAt !== "string" || createdAt.trim() === "") {
      console.error("Invalid 'created_at' value:", transaction);
      continue; // Hatalı tarih verisini atla
    }

    // Tarihi doğru formatta al: 'T' karakterinden önceki kısmı (yyyy-mm-dd) alıyoruz
    const date = createdAt.split("T")[0]; // Örneğin, "2023-07-08T14:45:30" -> "2023-07-08"
    
    // Eğer daha önce bu tarihte işlem eklenmemişse, yeni bir grup oluşturuyoruz
    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
    }

    // İşlemi gruba ekle
    grouped[date].transactions.push(transaction);

    // Miktarı güncelle: Eğer işlem bir "Expense" ise negatif, diğer türler pozitif olarak eklenir
    const amount =
      transaction.type === "Expense" ? -transaction.amount : transaction.amount;
    
    grouped[date].amount += amount;
  }

  return grouped;
};
