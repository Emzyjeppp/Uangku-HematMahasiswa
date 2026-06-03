from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tambah_pengeluaran')
def tambah_pengeluaran():
    return render_template('tambah_pengeluaran.html')

@app.route('/tambah_pemasukan')
def tambah_pemasukan():
    return render_template('tambah_pemasukan.html')

@app.route('/transaksi')
def transaksi():
    return render_template('transaksi.html')

@app.route('/laporan')
def laporan():
    return render_template('laporan.html')

@app.route('/laporan_mingguan')
def laporan_mingguan():
    return render_template('laporan_mingguan.html')

@app.route('/warung_murah')
def warung_murah():
    return render_template('warung_murah.html')

@app.route('/notifikasi')
def notifikasi():
    return render_template('notifikasi.html')

@app.route('/profil')
def profil():
    return render_template('profil.html')

@app.route('/target_tabungan')
def target_tabungan():
    return render_template('target_tabungan.html')

if __name__ == '__main__':
    app.run(debug=True)