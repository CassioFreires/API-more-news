import { createService, findAllService, findByIdService, updateService, deleteByIdService, totalPageService, topNewsService, searchNewsByTitleService, searchNewsByUserService, likeService, commentService, deleteCommentService } from "../services/news.service.js"
import { generateId } from "../utils/generateId.js";
import { generateDate } from "../utils/generateDate.js";

// crud REST API-FULLSTACK
const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body

        if (!title || !text || !banner) {
            return res.status(400).send({ message: 'Submit all fields to post a news story' })
        }

        await createService({
            title,
            text,
            banner,
            user: req.userId
        })

        res.status(201).send('create News successfully');
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
const findAll = async (req, res) => {
    try {
        let { page, limit } = req.query;
        const skip = (page - 1) * limit;
        page = Number(page) || 1;
        limit = Number(limit);


        const news = await findAllService(limit, skip);
        if (!news) {
            return res.status(400).send({ message: 'Not found news' });
        }

        const baseUrl = req.baseUrl;
        const totalPosts = await totalPageService();
        const totalPages = (Math.ceil(totalPosts / limit));

        const nextUrl = page < totalPages ? `${baseUrl}/findAll?page=${page + 1}&limit=${limit}` : null;

        const prevUrl = page > 1 ? `${baseUrl}/findAll?page=${page - 1}&limit=${limit}` : null;

        if (news.length === 0) {
            return res.status(400).send({ message: 'There are not registred news' })
        }

        const pagination = {
            limit: limit,
            currentPage: page,
            totalPosts: totalPosts,
            totalPages: totalPages,
            nextPage: nextUrl,
            prevPage: prevUrl,
        }

        res.send({
            message: 'Found news successfully',
            pagination: pagination,
            news: news
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const findById = async (req, res) => {
    try {

        const id = req.id;
        const news = await findByIdService(id);
        if (!news) {
            return res.status(400).send({ message: 'not found news by id' })
        }

        res.send({
            message: 'news found successfully',
            news
        })
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}

const update = async (req, res) => {
    try {
        const id = req.id;
        const { title, text, banner } = req.body;
        if (!title && !text && !banner) {
            return res.status(400).send({ message: 'Submit at least one field to update news' })
        }

        const news = await findByIdService(id);

        if (!news) {
            return res.status(400).send({ message: 'not found news' });
        }

        await updateService(id, { title, text, banner })

        res.send('news successfully update ')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const exclude = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await findByIdService(id);

        if (!news) {
            return res.status(400).send({ message: 'not found news' })
        }

        await deleteByIdService(id);

        res.send('news successfully deleted')
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// regra de negócios requisitadas pelo cliente
const topNews = async (req, res) => {
    try {
        const topNews = await topNewsService();
        if (!topNews) {
            return res.status(400).send({ message: 'Top news not found' })
        }

        return res.send(
            {
                message: 'top news successfully found',
                news: topNews
            }
        )
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const searchNewsByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).send({ message: 'Submit a text for find the news by title' })
        }

        const news = await searchNewsByTitleService(title);

        if (!news || news.length == 0) {
            return res.status(400).send({ message: 'We did not find any news with this title' })
        }

        return res.send({
            message: 'News successfully found for by title',
            news: news
        })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const searchNewsByUser = async (req, res) => {
    try {
        const id = req.userId;

        const news = await searchNewsByUserService(id);
        if (!news) {
            return res.status(400).send({ message: 'Not found news by user' })
        }
        // fazendo a busca das noticias referente ao usuário

        return res.send({
            message: 'These are all news find of user',
            news: news
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateNewsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text, banner } = req.body;

        if (!title && !text && !banner) {
            return res.status(500).send({ message: 'Submit at least one field' });
        }

        const news = await findByIdService(id);
        if (!news) {
            return res.status(400).send({ message: 'Not found news ' })
        }

        const userNewsId = news.user._id.toJSON();
        const userAuthId = req.userId;

        if (userNewsId !== userAuthId) {
            return res.status(400).send({ message: 'You can not update this new' })
        }


        await updateService(id, { title, text, banner })

        return res.send({ message: 'Update successfully post news', })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const excludeNewsByUser = async (req, res) => {
    try {

        const { id } = req.params;

        const news = await findByIdService(id);
        if (!news) {
            return res.status(400).send({ message: 'News not found' });
        }

        const userNewsId = news.user._id.toJSON();
        const userAuthId = req.userId;

        if (userNewsId !== userAuthId) {
            return res.status(400).send({ message: 'You can not delete this new' })
        }

        await deleteByIdService(id)
        return res.send({ message: 'News successfully delete', news: news })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const like = async (req, res) => {
    try {
        // pegar o id da noticias
        const { id } = req.params;

        // buscar a noticia na base
        const news = await findByIdService(id);
        if (!news) {
            return res.status(400).send({ message: 'Not found news' })
        }

        const alreadyLiked = news.likes.includes(req.userId);

        if (alreadyLiked) {
            // já deu like? remova o like
            news.likes.pop()
        } else {
            // se não deu like, adicionar like
            news.likes.push(req.userId)
        }

        await news.save();

        return res.send({ message: 'like', news: news })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const comment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const userId = req.userId;

        if (!comment) {
            return res.status(400).send({ message: 'Write a message to comment' })
        }

        const idComment = generateId(36);
        const date = generateDate();

        await commentService(id, {
            _id: idComment,
            comment: {
                idUser: userId,
                comment: comment,
                date: date
            }
        })

        
  
        return res.send('comment')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id, idComment } = req.params;
        const userId = req.userId;

        const news = await findByIdService(id);
        if(news.comments.length <= 0) {
            return res.send({message:'Not found comment'})
        }
        
        if(news.user._id.toJSON() !== userId) {
            return res.send({message:'You cant delete this comment'})
        }
        
       
        await deleteCommentService(id, idComment)
    
        return res.send({message: 'Comment sucessfully delete'})
    }catch(error) {
        return res.status(500).send(error.message);
    }
}

export {
    create,
    findAll,
    findById,
    update,
    exclude,

    topNews,
    searchNewsByTitle,
    searchNewsByUser,
    updateNewsByUser,
    excludeNewsByUser,
    like,
    comment,
     deleteComment
} 