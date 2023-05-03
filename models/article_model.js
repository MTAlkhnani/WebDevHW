const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('articles_store.db3', (err) => {
    if(err) return console.error(err.message);
});

// Define the getAllArticles function
function getAllArticles(callback) {
    db.all('SELECT * FROM articles', [], (err, rows) => {
      if (err) {
        console.error(err.message);
        return callback(err, null);
      }
      callback(null, rows);
    });
}
function getArticleDetail(article_id, callback) {
    db.get('SELECT * FROM articles WHERE id = ?', [article_id], (err, row) => {
      if (err) {
        console.error(err.message);
        return callback(err, null);
      }
      callback(null, row);
    });
}

function addArticle(article_data, callback) {
    const sql = `INSERT INTO articles (title, description, content, author, likes, arabicContent) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [article_data.title, article_data.description, article_data.content, article_data.author, article_data.likes, article_data.arabicContent];
    db.run(sql, params, function(err) {
      if (err) {
        console.error(err.message);
        return callback(err, null);
      }
      const metadata = {
        id: this.lastID,
        author: article_data.author,
        title: article_data.title,
        description: article_data.description,
        content: article_data.content,
        likes: article_data.likes,
        arabicContent: article_data.arabicContent,
        created_at: new Date().toISOString()
      };
      callback(null, metadata);
    });
  }
  function updateArticle(article_id, data, callback) {
    const sql = `UPDATE articles SET title = ?, description = ?, content = ?, author = ?, likes = ?, arabicContent = ? WHERE id = ?`;
    const params = [data.title, data.description, data.content, data.author, data.likes, data.arabicContent, article_id];
    db.run(sql, params, function(err) {
      if (err) {
        console.error(err.message);
        return callback(err, null);
      }
      const metadata = {
        id: article_id,
        author: data.author,
        title: data.title,
        description: data.description,
        content: data.content,
        likes: data.likes,
        arabicContent: data.arabicContent,
        updated_at: new Date().toISOString()
      };
      callback(null, metadata);
    });
  }
  function deleteArticle(article_id, callback) {
    const sql = `DELETE FROM articles WHERE id = ?`;
    const params = [article_id];
    db.run(sql, params, function(err) {
      if (err) {
        console.error(err.message);
        return callback(err, null);
      }
      const metadata = {
        id: article_id,
        deleted_at: new Date().toISOString()
      };
      callback(null, metadata);
    });
  }
  function likeArticle(article_id, callback) {
    const sql = `UPDATE articles SET likes = likes + 1 WHERE id = ?`;
    const params = [article_id];
    db.run(sql, params, function(err) {
      if (err) {
        console.error(err.message);
        return callback(err, null);
      }
      const metadata = {
        id: article_id,
        likes: this.changes, // the number of rows affected by the update operation
        updated_at: new Date().toISOString()
      };
      callback(null, metadata);
    });
  }
// Export the getAllArticles function using require("Path file name")
module.exports = {
  getAllArticles: getAllArticles,
  getArticleDetail: getArticleDetail,
  addArticle: addArticle,
  updateArticle: updateArticle,
  deleteArticle: deleteArticle,
  likeArticle: likeArticle
};

